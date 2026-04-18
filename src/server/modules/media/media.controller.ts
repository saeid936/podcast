import { Controller, Post, Body, UseGuards, Req, Get, Param, Headers, Res, HttpStatus } from '@nestjs/common';
import { MediaService } from './media.service';
import { AuthGuard } from '../auth/auth.guard';
import type { Request, Response } from 'express';
import { Readable } from 'stream';

@UseGuards(AuthGuard)
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('presigned-url')
  async getPresignedUrl(@Body('contentType') contentType: string, @Req() req: Request) {
    const userId = req['user'].sub;
    return this.mediaService.getPresignedUrl(contentType || 'audio/mpeg', userId);
  }

  @Post('process')
  async processUpload(
    @Body('title') title: string,
    @Body('key') key: string,
    @Req() req: Request
  ) {
    const userId = req['user'].sub;
    return this.mediaService.processUpload(title, key, userId);
  }

  @Get('stream/:id')
  async streamAudio(
    @Param('id') id: string,
    @Headers('range') range: string,
    @Res() res: Response
  ) {
    const { stream, contentType, contentLength, contentRange, acceptRanges } = 
      await this.mediaService.getTrackStream(id, range);

    // If S3 returns a Content-Range, it's a partial response (206)
    if (contentRange) {
      res.status(HttpStatus.PARTIAL_CONTENT);
      res.setHeader('Content-Range', contentRange);
    } else {
      res.status(HttpStatus.OK);
    }

    res.setHeader('Accept-Ranges', acceptRanges || 'bytes');
    res.setHeader('Content-Type', contentType || 'audio/mpeg');
    if (contentLength) {
      res.setHeader('Content-Length', contentLength.toString());
    }

    // Pipe the S3 readable stream directly to the Express response
    (stream as Readable).pipe(res);
  }
}
