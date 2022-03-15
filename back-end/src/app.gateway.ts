import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

class Game
{
    id: number;
    user1: number;
    user2: number;
    is_started: boolean;
    user1_accepted: boolean;
    user2_accepted: boolean;

    constructor(id: number, user1: number, user2: number, is_started: boolean, user1_accepted: boolean, user2_accepted: boolean)
    {
        this.id = id;
        this.user1 = user1;
        this.user2 = user2;
        this.is_started = is_started;
        this.user1_accepted = false;
        this.user2_accepted = false;
    }
}

@WebSocketGateway(3080, { cors: { origin: '*' } })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('AppGateway');
  usersConnect = [];
  i : number = 0;
  game : Game[] = [];

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }


  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected ${client.id}`);
    this.usersConnect.push(client.id);
    console.log(this.usersConnect.length);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client desconnected ${client.id}`);
    this.usersConnect = this.usersConnect.filter(user => user !== client.id);
    console.log(this.usersConnect.length);
  }


  @SubscribeMessage('DataToServer')
  handleMessage(client: Socket, payload: any): void {
    client.broadcast.emit('DataToClient', payload);
    
    // console.log(payload);
  }

  @SubscribeMessage('DataToServer2')
  handleBall(client: Socket, payload: any): void {
    client.broadcast.emit('DataToClient2', payload);
  }

  @SubscribeMessage('BallServer')
  connect_users(client: Socket, payload: any): void {
    client.broadcast.emit('BallClient', payload);
    }
  
  @SubscribeMessage('ConnectServer')
  connect_users2(client: Socket, payload: any): void 
  {
    console.log(payload);

    //find current game
    let game_id = this.game.findIndex(game => game.id == payload.game_id);
    if(game_id == -1)
      this.game.push(new Game(payload.GameInfo.game_id, payload.GameInfo.user1, payload.GameInfo.user2, false, false, false));
    client.emit('ConnectClient', this.i);
  }

}