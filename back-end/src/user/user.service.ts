import { Injectable } from '@nestjs/common';
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
        this.findByEmail(data.email).then(user => {
            if (user) {
                throw new Error('User already exists');
            }
        });
        
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
        return await this.repository.save(user);
    }

    findByEmail(email: string) 
    {
        return this.repository.findOne({ email: email });
    }

}

