import { Controller, Get, Module, Param, Post, Req, Res } from '@nestjs/common';
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

    createOne(request: any, data:{id:number,name:string,email:string,token:string,created_at:Date,updated_at:Date,deleted_at:Date,is_online:boolean,image:string,is_verified:boolean,country:string,wins:number,loses:number,quit:number,level:number}) { 
        return this.base.createOneBase(request, data);
    }

    @Post("me")
    async getMyData(@Req() req,@Res() res)
    {
        let user = await this.service.getUserByToken(req.body.token).then(user =>
        {
            if (user)
                return user;
            else
                return null;
        });
        res.json(user);
        return user;
    }

    @Get("all")
    async getAllUsers(@Res() res)
    {
        return await this.service.fetchAllUsers();
    }

    @Get("/next/")
    async getNextUser()
    {
        return await this.service.getNextUser();
    }

    @Get("/random/")
    async getRandomUser()
    {
        return await this.service.getRandomUser();
    }

  
}
