import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';

@Processor('media-processing')
export class MediaProcessor extends WorkerHost {
  constructor(private prisma: PrismaService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { trackId, s3Key } = job.data;
    console.log(`[Worker] Processing media for track ${trackId} at ${s3Key}`);

    // Simulate metadata extraction (e.g., using ffprobe to get duration)
    // In a real app, you would download the file or stream it to get the exact duration and bitrate
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Generate a random duration between 2 and 7 minutes for the demo
    const simulatedDuration = Math.floor(Math.random() * 300) + 120; 

    // Update track status to ready
    await this.prisma.track.update({
      where: { id: trackId },
      data: {
        status: 'ready',
        duration: simulatedDuration,
      },
    });

    console.log(`[Worker] Track ${trackId} processing complete. Duration: ${simulatedDuration}s`);
    return { success: true, duration: simulatedDuration };
  }
}
