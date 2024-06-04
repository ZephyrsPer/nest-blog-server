import { Injectable, HttpException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

/* dto */
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

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

  /* 注册 */
  async register(user: RegisterDto) {
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
  async login(user: LoginDto) {
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
  }
}