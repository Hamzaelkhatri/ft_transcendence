import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthModuleOptions } from '@nestjs/passport';
import { AppGateway } from './app.gateway';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { UserService } from './users/user.service';
import { User } from './users/user.entity';
// import {UserRepository} from './users/user.repository';
@Module({
  imports: [AuthModule,AuthModuleOptions,ConfigModule.forRoot(),TypeOrmModule.forFeature([User],'default'),UserModule],
  controllers: [AppController],
  providers: [AppService,AuthModuleOptions,AppGateway],
  exports: [AppGateway],
})
export class AppModule {}
