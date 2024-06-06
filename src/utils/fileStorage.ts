import { diskStorage } from 'multer';
// import * as path from 'path';

// console.log(__dirname);

export const fileStorage = diskStorage({
  // console.log(__dirname);

  // destination: path.join(__dirname, '/uploads'),
  destination: './uploads',
  // 自定义上传的文件名字
  filename: (req, file, cb) => {
    const singFileArray = file.originalname.split('.');
    const fileExtension = singFileArray[singFileArray.length - 1]; // 文件后缀名
    const newFilename = `${singFileArray[0]}_${Date.now()}.${fileExtension}`;
    cb(null, newFilename);
  },
});
