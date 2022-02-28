import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Game } from './game.entity';
import {InjectRepository} from '@nestjs/typeorm';
import UserService from '../user/user.service';

@Injectable()
export class GameService extends TypeOrmCrudService<Game> 
{
    repository: any;
    userservice : UserService;
    
    constructor(@InjectRepository(Game) repository, userservice: UserService)
    {
        super(repository);
        this.repository = repository;
        this.userservice = userservice;
    }

    async findAll(): Promise<Game[]>
    {
        return await this.repository.find();
    }

    async Invite(username1:string, username2:string)
    {
        // create new game
        let game = new Game();
        game.userId1 = this.userservice.getIdbyName(username1);
        game.userId2 = this.userservice.getIdbyName(username2);
        game.created_at = new Date();
        game.updated_at = new Date();
        game.is_accepted_by_user1 = true;
        game.is_accepted_by_user2 = false;
        game.is_finished = false;
        game.winner = null;
        await this.repository.save(game);
    }
}
