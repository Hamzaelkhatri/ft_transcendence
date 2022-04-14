import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Game } from './game.entity';
import UserService from '../user/user.service';
export declare class GameService extends TypeOrmCrudService<Game> {
    repository: any;
    userservice: UserService;
    constructor(repository: any, userservice: UserService);
    findAll(): Promise<Game[]>;
    Invite(username1: string, username2: string, map: string): Promise<Game>;
    is_invited(id: number): Promise<Game>;
    confirmInvitation(id: number, idgame: number): Promise<Game>;
    rejectInvitation(id: number, idgame: number): Promise<Game>;
    currentGames(): Promise<any[]>;
    is_waiting(id: number): Promise<Game>;
    finishGame(id: number, winner: number, json: string): Promise<Game>;
    watch(id: number): Promise<Game>;
    matchmaking(id: number, map: string): Promise<Game>;
    history(id: number): Promise<Game[]>;
}
