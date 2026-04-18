import { Injectable, NotFoundException } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PrismaService } from '../../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
  private s3Client: S3Client;

  constructor(
    private prisma: PrismaService,
    @InjectQueue('media-processing') private mediaQueue: Queue
  ) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy',
      },
      endpoint: process.env.AWS_S3_ENDPOINT,
      // forcePathStyle: true, // Often needed for MinIO or R2
    });
  }

  async getPresignedUrl(contentType: string, userId: string) {
    const key = `uploads/${userId}/${uuidv4()}`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET || 'audiostream-bucket',
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    return { url, key };
  }

  async processUpload(title: string, key: string, userId: string) {
    // 1. Create track in DB with 'processing' status
    const track = await this.prisma.track.create({
      data: {
        title,
        s3Key: key,
        artistId: userId,
        duration: 0, // Will be updated by the worker
        status: 'processing',
      },
    });

    // 2. Add job to BullMQ
    await this.mediaQueue.add('extract-metadata', {
      trackId: track.id,
      s3Key: key,
    });

    return track;
  }

  async getTrackStream(trackId: string, range?: string) {
    const track = await this.prisma.track.findUnique({ where: { id: trackId } });
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET || 'audiostream-bucket',
      Key: track.s3Key,
      Range: range, // Pass the HTTP Range header directly to S3
    });

    try {
      const response = await this.s3Client.send(command);
      return {
        stream: response.Body,
        contentType: response.ContentType,
        contentLength: response.ContentLength,
        contentRange: response.ContentRange,
        acceptRanges: response.AcceptRanges,
      };
    } catch (error) {
      console.error('S3 GetObject Error:', error);
      throw new NotFoundException('Media file not found or inaccessible');
    }
  }
}
