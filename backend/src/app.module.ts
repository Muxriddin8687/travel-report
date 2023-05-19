import { Module } from '@nestjs/common';
import { MysqlModule } from 'nest-mysql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MulterModule } from '@nestjs/platform-express/multer';
import { memoryStorage } from 'multer';
import { ConfigModule } from '@nestjs/config';

import { getEnvPath } from './core/envs/env.helpers';
import { AuthModule } from './modules/auth/auth.module';
import { ActionModule } from './modules/action/action.module';
import { ServiceModule } from './modules/service/service.module';
import { ActionItemModule } from './modules/action-item/action-item.module';
const envFilePath: string = getEnvPath('./src/core/envs');

@Module({
  imports: [
    MysqlModule.forRoot({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'travel_report',
      multipleStatements: true
    }),
    ConfigModule.forRoot({ envFilePath: envFilePath, isGlobal: true }),
    MulterModule.register({
      storage: memoryStorage(),
    }),
    AuthModule,
    ActionModule,
    ServiceModule,
    ActionItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
