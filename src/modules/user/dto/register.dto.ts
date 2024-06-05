// register.dto.ts

import {
  IsString,
  IsNotEmpty,
  Length,
  MinLength,
  MaxLength,
  // Matches,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20) // 假设用户名长度在 4 到 20 之间
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8) // 密码最小长度为 8
  @MaxLength(32) // 密码最大长度为 32（这只是个例子，你可以根据需要进行调整）
  password: string;
}
