import {
  Controller,
  Body,
  Post,
  Inject,
  Res,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
/* dto */
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayloadDto } from './dto/payload.dto';

import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/guard/auth.guard';

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
    const foundUser: JwtPayloadDto = await this.userService.login(user);

    if (foundUser) {
      // 构造JWT的payload
      const payload: JwtPayloadDto = {
        username: foundUser.username,
        nick_name: foundUser.nick_name, // 如果存在的话
        role: foundUser.role, // 假设用户实体中有一个role字段
      };
      const token = await this.jwtService.signAsync({
        payload,
      });
      res.setHeader('authorization', 'bearer ' + token);

      return 'login success';
    } else {
      return 'login fail';
    }
  }

  /* 用户修改个人信息 */
  @Put('updateUserInfo')
  updateUserInfo() {
    return 'updateUserInfo';
  }

  /* 修改密码 */
  @Put('/updatePassword')
  updatePassword() {
    return 'updatePassword';
  }

  /* 管理员修改用户角色 */
  @Put('adminUpdateRole/:id/:role')
  updateRole() {
    return 'updateRole';
  }

  /* 管理员修改用户信息 */
  @Put('adminUpdateUserInfo/:id')
  adminUpdateUserInfo() {
    return 'updateUserInfo';
  }

  @Get('getUserInfo')
  @UseGuards(AuthGuard)
  getUserInfo() {
    return 'userinfo';
  }
}
