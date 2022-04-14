import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { GameService } from './game/game.service';
import { Server, Socket } from 'socket.io';
declare class Game {
    id: number;
    user1: number;
    user2: number;
    is_started: boolean;
    user1_accepted: boolean;
    user2_accepted: boolean;
    constructor(id: number, user1: number, user2: number, is_started: boolean, user1_accepted: boolean, user2_accepted: boolean);
}
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger;
    usersConnect: any[];
    i: number;
    game: Game[];
    gameService: GameService;
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleMessage(client: Socket, payload: any): void;
    handleBall(client: Socket, payload: any): void;
    connect_users(client: Socket, payload: any): void;
    connect_users2(client: Socket, payload: any): void;
    pause(client: Socket, payload: any): void;
    gameOver(client: Socket, payload: any): void;
}
export {};
