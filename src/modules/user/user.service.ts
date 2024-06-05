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
import * as crypto from 'crypto';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;
  @Inject(JwtService)
  private jwtService: JwtService;

  /* 注册 */
  async register(user: RegisterDto) {
    console.log(user);
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    /**
     * 校验用户是否已存在
     */
    if (foundUser) {
      throw new HttpException('用户已存在', 200);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);

    try {
      await this.userRepository.save(newUser);
      this.logger.log('注册成功', UserService);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }

  /* 登录 */
  /* 验证是否存在用户，判断密码是否正确 */
  async validateUser(username: string, password: string): Promise<User | null> {
    const foundUser = await this.userRepository.findOneBy({
      username: username,
    });
    if (!foundUser || foundUser.password !== md5(password)) {
      return null;
    }
    return foundUser;
  }
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

  /*   async login(user: LoginDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (!foundUser) {
      throw new HttpException('用户名不存在', 200);
    }
    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 200);
    }
    return foundUser;
  } */
}
