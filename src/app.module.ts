/* 最初 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
/* Module */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';
import { InfoModule } from './modules/info/info.module';
import { UpLoadModule } from './modules/up-load/up-load.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<string>('TYPE') as 'mysql',
        host: configService.get<string>('HOST'),
        port: configService.get<number>('PORT'),
        username: configService.get<string>('USER'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    JwtModule.register({
      global: true,
      secret: process.env?.JWT_SECRET,
      signOptions: {
        expiresIn: process.env?.JWT_EXPIRES_IN,
        algorithm: 'HS256', // 加密算法，这里使用的是 HS256
      },
    }),
    UserModule,
    InfoModule,
    UpLoadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
