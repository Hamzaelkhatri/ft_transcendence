import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthModuleOptions } from '@nestjs/passport';
import { UsersModule } from './users/users.module';
import { AppGateway } from './app.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule,UsersModule,AuthModuleOptions,ConfigModule.forRoot()],
//   imports: []
  controllers: [AppController],
  providers: [AppService,AuthModuleOptions,AppGateway],
})
export class AppModule {}
