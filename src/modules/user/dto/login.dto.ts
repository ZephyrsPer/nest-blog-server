// login.dto.ts
// import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  /* @ApiProperty({
    example: 'QAQ',
    description: '用户名',
  }) */
  @IsString()
  @MinLength(4) // 用户名至少4个字符
  @MaxLength(50) // 用户名最多50个字符
  username: string;

  /* @ApiProperty({
    example: '123456',
    description: '密码',
  }) */
  @IsString()
  @MinLength(6) // 密码至少6个字符
  @MaxLength(50) // 密码最多50个字符
  password: string;
}
