import { Strategy } from 'passport-42';
import { PassportSerializer, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService)
  {
    super({
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: process.env.CALL_BACK,
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any) 
  {
    console.log(accessToken);
      return accessToken;
  }
}
  