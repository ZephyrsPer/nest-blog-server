import * as qiniu from 'qiniu';
const upload = (ak, sk, bucket, readableStream, fileName) => {
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
};

export default upload;
