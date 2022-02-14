import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth.42api';
import {FoutyTwoAuthGuard} from './auth.login';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy,FoutyTwoAuthGuard],
  exports: [AuthService],
})
export class AuthModule 
{}
