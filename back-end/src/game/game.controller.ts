import { Controller, Get, Post, Req } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Game } from './game.entity';
import {GameService} from './game.service';
import {Param} from '@nestjs/common';

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
        return await this.service.findAll();
    }

    @Post('/invite')
    async Invite(@Req() req)
    {
        console.log(req.body);
        return await this.service.Invite(req.body.username1, req.body.username2);
    }

    @Get("/is_invited/:id")
    async is_invited(@Param("id") id: number)
    {
        return await this.service.is_invited(id);
    }

    @Get("/invited/confirm/:id/:idgame")
    async confirm(@Param("id") id: number, @Param("idgame") idgame: number)
    {
        return await this.service.confirmInvitation(id, idgame);
    }

}
