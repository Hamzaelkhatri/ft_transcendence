import { Controller, Get } from '@nestjs/common';
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
    
    constructor(public service: GameService) { }

    get base(): CrudController<Game> {
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
    createOne(request: any, data: any) {
        return this.base.createOneBase(request, data);
    }

    @Get('/All')
    async findAll(): Promise<Game[]> 
    {
        return await this.service.findAll();
    }

}
