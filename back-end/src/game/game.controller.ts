import { Controller, Get, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Game } from './game.entity';
import {GameService} from './game.service';

@Crud({
    model: {
        type: Game,
    },
})
@Controller('game')
export class GameController implements CrudController<Game> {
    
    constructor(public service: GameService)
    {
    }

    get base(): CrudController<Game>
    {
        return this;
    }

    getService()
    {
        return this.service;
    }

    getMany(request: any)
    {
        return this.base.getManyBase(request);
    }

    getOne(request: any)
    {
        return this.base.getOneBase(request);
    }

    createOne(request: any, data: any)
    {
        return this.base.createOneBase(request, data);
    }

    @Get('/all')
    async findAll()
    {
        // return all information about all games
        return await this.service.findAll();
        return await this.service.findAll();
    }

    @Post('/invite')
    async Invite(username1:string, username2:string)
    {
        return await this.service.Invite(username1, username2);
    }

}
