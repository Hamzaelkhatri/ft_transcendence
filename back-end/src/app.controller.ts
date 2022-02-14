
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FoutyTwoAuthGuard } from './auth/auth.login';

@Controller()
export class AppController {

  @UseGuards(FoutyTwoAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

}