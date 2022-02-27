import { Controller, Get, Module } from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud'; // <-- Import the CrudController
import { User } from './user.entity';
import UserService from './user.service';

@Crud({
    model: {
        type: User,
    }
})
@Controller('user')
export class UserController implements CrudController<User> 
{
    constructor(public service: UserService) 
    {

    }

    get base(): CrudController<User>
    {
        return this;
    }

    getService() {
        return this.service;
    }

    getMany(request: any) {
        return this.base.getManyBase(request);
    }

    getOne(request: any) {
        return this.base.getOneBase(request);
    }

    createOne(request: any, data:{id:number,name:string,email:string,token:string,created_at:Date,updated_at:Date,deleted_at:Date,is_online:boolean,image:string,is_verified:boolean}) 
    {
        return this.base.createOneBase(request, data);
    }
    
}
