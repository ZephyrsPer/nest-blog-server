import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'; // 如果你使用 @nestjs/config

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 如果你使用 @nestjs/config
  const configService = app.get(ConfigService);
  const port = configService.get<number>('RUN_PORT') || 3000;
  // console.log(`项目运行端口: ${port} `);

  // 如果你直接从 process.env 中读取（不使用 @nestjs/config）
  // const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
