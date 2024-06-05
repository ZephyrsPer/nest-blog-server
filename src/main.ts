import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'; // 如果你使用 @nestjs/config
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* 
  const options = new DocumentBuilder()
    .setTitle('Blog-Server') // 标题
    .setDescription('系统接口文档') // 描述
    .setVersion('1.0') // 版本
    .build();

  const document = SwaggerModule.createDocument(app, options);
  //配置swgger地址
  SwaggerModule.setup('/api', app, document); */

  // 如果你使用 @nestjs/config
  const configService = app.get(ConfigService);
  const port = configService.get<number>('RUN_PORT') || 3000;
  // console.log(`项目运行端口: ${port} `);

  // 如果你直接从 process.env 中读取（不使用 @nestjs/config）
  // const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
