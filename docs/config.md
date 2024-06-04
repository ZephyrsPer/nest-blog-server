#### 配置config
```bash
yarn add @nestjs/config
```

##### 这样就可以全局注入了
```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
/* Module */
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

##### 使用例子
```ts
// some.service.ts  
import { Injectable } from '@nestjs/common';  
import { ConfigService } from '@nestjs/config';  
  
@Injectable()  
export class SomeService {  
  constructor(private configService: ConfigService) {}  
  
  getConfigValue(key: string): any {  
    return this.configService.get(key);  
  }  
  
  // 例如获取DB_HOST配置  
  getDatabaseHost(): string {  
    return this.configService.get<string>('DB_HOST');  
  }  
}
```