import {
  // Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UpLoadService } from './up-load.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from 'src/utils/fileStorage';

@Controller('up-load')
export class UpLoadController {
  constructor(private readonly upLoadService: UpLoadService) {}

  @Post('picture')
  @UseInterceptors(
    FileInterceptor('picture', {
      // dest: 'uploads',
      storage: fileStorage,
      // 限制图片大小
      limits: {
        fileSize: 1024 * 1024 * 2, // 2M
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      data: file /* ?.mimetype */, //,
    });
  }
}
