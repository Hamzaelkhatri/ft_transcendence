import { Controller, Request, Post,Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from './auth.service';
import { LocalStrategy } from './auth/local.strategy';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('42'))
  @Get('/auth/42/callback')
  async login(@Request() req) {
    // console.log(req.json());
    // return the query as a json object
    return req.user;
  }

  //get user info

    // @UseGuards(AuthGuard('42'))
    // @Get('/auth/42/callback')
    // async getUser(@Request() req) {
        


    //     return req.user;
    //     }
}
