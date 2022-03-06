import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3080, { cors: { origin: '*' } })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('AppGateway');
  usersConnect = [];

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
}