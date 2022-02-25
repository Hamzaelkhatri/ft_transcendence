import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
 
import { UserController } from './user.controller';
import { User } from './User.entity';
import { UserService } from './User.service';
 
@Module({
  imports: [TypeOrmModule.forFeature([User]),TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'helkhatr',
      password: '',
      database: 'web',
      entities: [User],
      synchronize: true,
      name: 'default',
    }
  )],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}