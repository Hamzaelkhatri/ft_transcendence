import { Injectable, Req } from '@nestjs/common';
import UserService from '../user/user.service'
import { CrudRequest } from '@nestjsx/crud';
import { User } from 'src/user/user.entity';
@Injectable()
export class AuthService {

  userService: UserService
  constructor(userService: UserService) {
    this.userService = userService;
  }

  async validateUser(token: any,@Req() req): Promise<User> {

    // const user = await this.userService.getUserByToken(token.accessToken).then(res =>{ return (res)})
    // if(!user)
    // {
    //   // this.userService.createOne()
   
    // }

    return await this.userService.createOne(req,
      {
        name: token.profile.displayName,
        "email": token.profile.emails[0].value,
        "token": token.accessToken,
        "created_at": new Date(),
        "updated_at": new Date(),
        "deleted_at": new Date(),
        "is_online": true,
        "image": token.profile.photos[0].value,
        "is_verified": true,
      });
  }
}