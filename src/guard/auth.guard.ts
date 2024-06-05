import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  // 假设你有一个黑名单服务，用于检查令牌是否已被标记为无效
  // @Inject(BlacklistService)
  // private blacklistService: BlacklistService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.header('authorization') || '';
    const bearer = authorization.split(' ');
    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException('登录 token 错误或缺失');
    }

    const token = bearer[1];

    // 假设你有一个黑名单服务，这里可以检查令牌是否在黑名单中
    // if (this.blacklistService.isTokenBlacklisted(token)) {
    //   throw new UnauthorizedException('登录 token 已被注销或失效');
    // }

    try {
      const info = this.jwtService.verify(token);
      (request as any).user = info.user; // 或者你可以使用请求范围的存储来保存用户信息

      // 在这里，你可以根据info中的信息（如角色或权限）进行进一步的访问控制

      return true;
    } catch (e) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }
  }
}
