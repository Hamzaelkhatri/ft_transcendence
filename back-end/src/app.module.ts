import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthModuleOptions } from '@nestjs/passport';
import { UsersModule } from './users/users.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [AuthModule,UsersModule,AuthModuleOptions],
//   imports: []
  controllers: [AppController],
  providers: [AppService,AuthModuleOptions],
})
export class AppModule {}
