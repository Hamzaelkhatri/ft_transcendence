import { Controller, Request, Post,Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from './auth.service';
import { LocalStrategy } from './auth/local.strategy';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('42'))
  @Get('/auth/42/callback')
  async login(@Request() req) 
  {
    console.log(req.raw);
    return req.user;
  }
  @Get('/')
  async wlcome() {
    return "welcome"
  }
}
