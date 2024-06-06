import {
  Controller,
  Body,
  Res,
  Post,
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
  async register(@Body() userDto: RegisterDto, @Res() res: Response) {
    try {
      await this.userService.register(userDto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: '成功注册',
      });
    } catch (error) {
      return res.status(HttpStatus.OK).json({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  /* 登录 */
  // @ApiOperation({ summary: '登录' })
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() userDto: LoginDto,
    @Res() res: Response,
  ): Promise<{ message: string; token: string } | any> {
    try {
      const payload = await this.userService.login(userDto);
      const token = await this.userService.generateJwt(payload);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Login success',
        token: 'Bearer ' + token,
      });
    } catch (error) {
      // 确保你的错误对象有一个合适的状态码和消息，否则你可能需要在这里进行转换
      return res.status(HttpStatus.OK).json({
        statusCode: error.status,
        message: error.message,
      });
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
