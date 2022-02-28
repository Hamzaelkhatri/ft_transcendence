import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Game } from './game.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class GameService extends TypeOrmCrudService<Game> 
{
    repository: any;
    constructor(@InjectRepository(Game) repository) 
    {
        super(repository);
        this.repository = repository;
    }

    async findAll(): Promise<Game[]>
    {
        return await this.repository.find();
    }
}
