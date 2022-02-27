import { Injectable } from '@nestjs/common';
import UserService from '../user/user.service'
import { CrudRequest } from '@nestjsx/crud';
import { User } from 'src/user/user.entity';
@Injectable()
export class AuthService {

  userService: UserService
  constructor(userService: UserService) {
    this.userService = userService;
  }

  async validateUser(token: any): Promise<User> {


    return await this.userService.createOne(null,
      {
        name: "Hamza Elkhatri",
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