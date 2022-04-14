"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
class Game {
    constructor(id, user1, user2, is_started, user1_accepted, user2_accepted) {
        this.id = id;
        this.user1 = user1;
        this.user2 = user2;
        this.is_started = is_started;
        this.user1_accepted = false;
        this.user2_accepted = false;
    }
}
let AppGateway = class AppGateway {
    constructor() {
        this.logger = new common_1.Logger('AppGateway');
        this.usersConnect = [];
        this.i = 0;
        this.game = [];
    }
    afterInit(server) {
        this.logger.log('Initialized');
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected ${client.id}`);
        this.usersConnect.push(client.id);
        console.log(this.usersConnect.length);
    }
    handleDisconnect(client) {
        this.logger.log(`Client desconnected ${client.id}`);
        this.usersConnect = this.usersConnect.filter(user => user !== client.id);
        console.log(this.usersConnect.length);
    }
    handleMessage(client, payload) {
        this.server.emit('DataToClient', payload);
    }
    handleBall(client, payload) {
        this.server.emit('DataToClient2', payload);
    }
    connect_users(client, payload) {
        this.server.emit('BallClient', payload);
    }
    connect_users2(client, payload) {
        let game_id = this.game.findIndex(game => game.id == payload.GameInfo.id);
        if (game_id == -1) {
            this.game.push(new Game(payload.GameInfo.id, payload.GameInfo.userId1, payload.GameInfo.userId2, false, true, false));
        }
        else {
            if (this.game[game_id].user1 == payload.idUser || this.game[game_id].user2 == payload.idUser
                || this.game[game_id].user2 == 0) {
                this.game[game_id].is_started = true;
                this.game[game_id].user1_accepted = true;
                this.game[game_id].user2_accepted = true;
                this.game[game_id].user2 = payload.idUser;
                if (this.game[game_id].user2 == payload.idUser) {
                    payload.GameInfo.is_started = true;
                    payload.GameInfo.user1_accepted = true;
                    payload.GameInfo.user2_accepted = true;
                }
            }
        }
        game_id = this.game.findIndex(game => game.id == payload.GameInfo.id);
        this.server.emit('ConnectClient', payload.GameInfo);
    }
    pause(client, payload) {
        this.server.emit('PauseClient', payload);
    }
    gameOver(client, payload) {
        console.log(payload);
        this.server.emit('GameOverClient', payload);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('DataToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('DataToServer2'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleBall", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('BallServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "connect_users", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('ConnectServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "connect_users2", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('PauseServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "pause", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('GameOverServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "gameOver", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3080, { cors: { origin: '*' } })
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map