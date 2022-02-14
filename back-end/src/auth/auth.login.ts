import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {Strategy} from 'passport-42';
// import { Passport } from '@nestjs/passport';
import { PassportStrategy } from '@nestjs/passport';
import { PassportModule } from '@nestjs/passport';


@Injectable()
export class FoutyTwoAuthGuard extends AuthGuard('42') 
{ 

    passport: any;
  
    constructor(private authService: AuthService) {
      super();
        /// use Strategy42 to get the token
        Strategy.use(new Strategy(
          {
            clientID: 'fouty-two',
            clientSecret: 'fouty-two-secret',
            callbackURL: 'http://localhost:3000/auth/42/callback',
            scope: ['profile', 'email'],
          },
          (accessToken, refreshToken, profile, done) => {
            function doneWithError(err) {
              return done(err, false);
            }
          }
        ));

    }
      // PassportStrategy.use(new Strategy(
      //   {
      //       clientID: 'fouty-two',
      //       clientSecret: 'fouty-two-secret',
      //       callbackURL: 'http://localhost:3000/auth/42/callback',
      //       passReqToCallback: true,
      //   },
      //   (req, accessToken, refreshToken, profile, done) => {
      //       this.authService.validateUser(req.body.username, req.body.password)
      //       .then(user => done(null, user))
      //       .catch(err => done(err, false));
      //   }
      //   ));
    
    async validate(payload: any) {
      const user = await this.authService.validateUser(payload.email, payload.password);
      if (!user) {
        throw  "(nooope) UnauthorizedException";
      }
      return user;
    }
}