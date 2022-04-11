import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthModuleOptions } from '@nestjs/passport';
import { UserModule } from '../user/user.module';



@Module({
  imports: [PassportModule,AuthModuleOptions,UserModule],
  providers: [AuthService, LocalStrategy],
  exports : [AuthService],
})
export class AuthModule {}
