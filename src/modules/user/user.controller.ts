import {
  Controller,
  Body,
  Post,
  Res,
  Get,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
/* dto */
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

/* 守卫 */
import { AuthGuard } from 'src/guard/auth.guard';

/* Swagger */
// import { ApiOperation, ApiTags } from '@nestjs/swagger';

// @ApiTags('用户-User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* 注册 */
  /*  // 使用 ValidationPipe 进行验证，并启用 whitelist 选项以自动删除未定义的属性 */
  // @ApiOperation({ summary: '注册' })
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() UserDto: RegisterDto) {
    return await this.userService.register(UserDto);
  }

  /* 登录 */
  // @ApiOperation({ summary: '登录' })
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() UserDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const payload = await this.userService.login(UserDto);
      const token = await this.userService.generateJwt(payload);

      res.setHeader('Authorization', 'Bearer ' + token);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Login success', token });
    } catch (error) {
      return res.status(error.getStatus()).json({ message: error.message });
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
