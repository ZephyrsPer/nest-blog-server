import {
  // Body,
  Controller,
  // Get,
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

import * as path from 'path';

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
      // 限制图片格式
      fileFilter(req, file, callback) {
        const extname = path.extname(file.originalname);
        if (['.png', '.jpg', '.gif', '.jpeg'].includes(extname)) {
          callback(null, true);
        } else {
          callback(new Error('只能上传图片！'), false);
        }
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const info = await this.upLoadService.uploadToQiniu(file.filename);
    return res.status(HttpStatus.OK).json({
      message: '文件上传成功',
      data: info,
    });
  }
}
