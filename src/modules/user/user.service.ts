import {
  Injectable,
  HttpException,
  Logger,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
/* 用户模型 */
import { User } from './entities/user.entity';

/* dto */
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayloadDto } from './dto/payload.dto';

/* utils */
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;
  @Inject(JwtService)
  private jwtService: JwtService;

  /* 用来hash密码 */
  private hashPassword(password: string): string {
    return bcrypt.hash(password, 10); // 10 是默认的 salt rounds
  }

  // 私有方法，用于比较哈希密码
  private async comparePasswords(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /* 验证是否存在用户，判断密码是否正确 */
  private async validateUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const foundUser = await this.userRepository.findOneBy({
      username: username,
    });
    if (
      !foundUser ||
      !(await this.comparePasswords(foundUser.password, password))
    ) {
      return null;
    }
    return foundUser;
  }

  /* 注册 */
  async register(userDto: RegisterDto) {
    // 查找是否已存在具有相同用户名的用户
    const foundUser = await this.userRepository.findOneBy({
      username: userDto.username,
    });

    // 校验用户是否已存在
    if (foundUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    // 创建新用户并设置其属性
    const newUser = new User();
    newUser.username = userDto.username;
    newUser.password = await this.hashPassword(userDto.password); // 使用 bcrypt 加密密码

    try {
      // 保存新用户
      await this.userRepository.save(newUser);
      this.logger.log('注册成功', 'UserService'); // 注意：需要确保 this.logger 被正确定义和注入
      return { status: 'success', message: '注册成功' }; // 返回更详细的响应
    } catch (e) {
      this.logger.error(e, 'UserService'); // 注意：需要确保 this.logger 被正确定义和注入
      throw new HttpException('注册失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /* 登录 */
  /* 登录返回用户信息 */
  async login(userDto: LoginDto): Promise<JwtPayloadDto> {
    const user = await this.validateUser(userDto.username, userDto.password);
    if (!user) {
      throw new HttpException('用户名或密码错误', HttpStatus.BAD_REQUEST);
    }

    const payload: JwtPayloadDto = {
      username: user.username,
      nick_name: user.nick_name, // 如果存在的话
      role: user.role, // 假设用户实体中有一个role字段
    };

    return payload;
  }

  /* 产生jwt */
  async generateJwt(payload: JwtPayloadDto): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
