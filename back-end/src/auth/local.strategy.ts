import { Strategy } from 'passport-42';
import { PassportSerializer, PassportStrategy } from '@nestjs/passport';
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  // authServices:AuthService;
  constructor(private authService: AuthService)
  {
    super({
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: process.env.CALL_BACK,
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any,@Req() req)
  {
    return await this.authService.validateUser(
      {
        accessToken: accessToken,
        profile: profile,
      },req
    ).then(user => {
      return user.token;
    }).catch(err => {
      throw new UnauthorizedException();
    });
  }
}
