import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

import * as qiniu from 'qiniu';
@Injectable()
export class UpLoadService {
  @Inject()
  private configService: ConfigService;

  private async qiniuUpload(ak, sk, bucket, readableStream, fileName) {
    /* 生成鉴权对象 */
    const mac = new qiniu.auth.digest.Mac(ak, sk);
    const options = {
      scope: bucket,
    };
    /* 上传凭证 */
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    /* 对应区域 */
    const config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;
    /* 文件信息准备 */
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    /* 上传 */
    return new Promise((resolved, reject) => {
      formUploader.putStream(
        uploadToken,
        fileName,
        readableStream,
        putExtra,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function (respErr, respBody, _respInfo) {
          if (respErr) {
            reject(respErr);
          } else {
            resolved(respBody);
          }
        },
      );
    });
  }
  constructor() {}

  async uploadToQiniu(fileName) {
    const ak = this.configService.get<string>('ACCESSKEY');
    const sk = this.configService.get<string>('SECRETKEY');
    const bucket = this.configService.get<string>('BUCKET');
    const reader = fs.createReadStream(`./uploads/${fileName}`);
    // 但是，更好的做法是在删除文件之前确保流已经被关闭或完成读取
    // 你可以通过监听 'close' 或 'end' 事件来做到这一点
    reader.on('close', () => {
      // 在这里安全地删除文件
      fs.unlinkSync(`./uploads/${fileName}`);
      // console.log('文件已删除');
    });
    return await this.qiniuUpload(ak, sk, bucket, reader, fileName);
  }
}
