import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Successfully connected to the database');
    } catch (error) {
      console.warn('Could not connect to the database on startup. Queries will retry on demand.', error);
    }
  }
}
