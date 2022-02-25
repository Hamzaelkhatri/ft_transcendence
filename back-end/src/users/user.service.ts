import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Get } from '@nestjs/common';
 
 
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}



  findAll(): Promise<User[]> {
    return this.UserRepo.find();
  }
}
