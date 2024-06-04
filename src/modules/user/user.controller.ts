import {
  Controller,
  Body,
  Post,
  Inject,
  Res,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
/* dto */
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt';
import { LoginGuard } from 'src/guard/login.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  /* 注册 */
  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.userService.register(user);
  }

  /* 登录 */
  @Post('login')
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const foundUser: LoginDto = await this.userService.login(user);

    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          // id: foundUser.id,
          username: foundUser.username,
        },
      });
      res.setHeader('authorization', 'bearer ' + token);

      return 'login success';
    } else {
      return 'login fail';
    }
  }

  @Get('getUserInfo')
  @UseGuards(LoginGuard)
  getUserInfo() {
    return 'userinfo';
  }
}
