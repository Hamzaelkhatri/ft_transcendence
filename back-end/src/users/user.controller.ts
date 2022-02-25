import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Get } from "@nestjs/common";
import { UserService } from "./user.service";


@Injectable()
export class UserController {
   userService: UserService;
   constructor(private readonly UserService: UserService){}

  @Get('/all')
  async getAll():Promise<User[]>
  {
      return await this.userService.findAll();
  }
}