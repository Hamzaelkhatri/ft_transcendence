import { CrudController } from '@nestjsx/crud';
import { Game } from './game.entity';
import { GameService } from './game.service';
export declare class GameController implements CrudController<Game> {
    service: GameService;
    constructor(service: GameService);
    get base(): CrudController<Game>;
    getService(): GameService;
    getMany(request: any): Promise<Game[] | import("@nestjsx/crud").GetManyDefaultResponse<Game>>;
    getOne(request: any): Promise<Game>;
    createOne(request: any, data: any): Promise<Game>;
    findAll(): Promise<Game[]>;
    Invite(req: any): Promise<Game>;
    is_invited(id: number): Promise<Game>;
    confirm(id: number, idgame: number): Promise<Game>;
    reject(id: number, idgame: number): Promise<Game>;
    current(): Promise<any[]>;
    is_begin(id: number): Promise<Game>;
    finishGame(id: number, winner: number, req: any): Promise<Game>;
    watch(id: number): Promise<Game>;
    matchmaking(id: number, map: string): Promise<Game>;
    history(id: number): Promise<Game[]>;
}
