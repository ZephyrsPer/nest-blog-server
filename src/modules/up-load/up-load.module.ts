import { Module } from '@nestjs/common';
import { UpLoadService } from './up-load.service';
import { UpLoadController } from './up-load.controller';

@Module({
  controllers: [UpLoadController],
  providers: [UpLoadService],
})
export class UpLoadModule {}
