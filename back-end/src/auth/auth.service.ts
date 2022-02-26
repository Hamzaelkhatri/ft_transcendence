import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async validateUser(token: string): Promise<any> {
    // console.log(username);

    return { token: token };
  }
}
