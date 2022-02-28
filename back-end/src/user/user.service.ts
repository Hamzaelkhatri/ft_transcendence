import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export default class UserService extends TypeOrmCrudService<User> 
{

    repository: any;
    constructor(@InjectRepository(User) repository) {
        super(repository);
        this.repository = repository;
    }

    async createOne(request: CrudRequest, data: Partial<User>) 
    {

        let res = await  this.findByEmail(data.email).then(user => 
            {
                if (user)
                {
                    return user;
                }
                else
                {
                    return null;
                }
            }
        );

        if (res)
        {
            return res;
        }

        const user = new User();
        user.name = data.name;
        user.email = data.email;
        user.image = data.image;
        user.is_online = data.is_online;
        user.token = data.token;
        user.created_at = data.created_at;
        user.updated_at = data.updated_at;
        user.deleted_at = data.deleted_at;
        user.is_verified = data.is_verified;
        this.repository.save(user);
        return user
    }

    findByEmail(email: string) : Promise<User>
    {
        return this.repository.findOne({ email: email });
    }

    async getUserByToken(token: string) : Promise<User>
    {
        return await this.repository.findOne({ token: token });
    }

    fetchAllUsers() : Promise<User[]>
    {
        return this.repository.find();
    }

}

