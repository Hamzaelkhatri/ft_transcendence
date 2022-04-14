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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const common_1 = require("@nestjs/common");
const crud_1 = require("@nestjsx/crud");
const game_entity_1 = require("./game.entity");
const game_service_1 = require("./game.service");
const common_2 = require("@nestjs/common");
let GameController = class GameController {
    constructor(service) {
        this.service = service;
    }
    get base() {
        return this;
    }
    getService() {
        return this.service;
    }
    getMany(request) {
        return this.base.getManyBase(request);
    }
    getOne(request) {
        return this.base.getOneBase(request);
    }
    createOne(request, data) {
        return this.base.createOneBase(request, data);
    }
    async findAll() {
        return await this.service.findAll();
    }
    async Invite(req) {
        return await this.service.Invite(req.body.username1, req.body.username2, req.body.map);
    }
    async is_invited(id) {
        return await this.service.is_invited(id);
    }
    async confirm(id, idgame) {
        return await this.service.confirmInvitation(id, idgame);
    }
    async reject(id, idgame) {
        return await this.service.rejectInvitation(id, idgame);
    }
    async current() {
        return await this.service.currentGames();
    }
    async is_begin(id) {
        return await this.service.is_waiting(id);
    }
    async finishGame(id, winner, req) {
        return await this.service.finishGame(id, winner, req.body.map);
    }
    async watch(id) {
        return await this.service.watch(id);
    }
    async matchmaking(id, map) {
        return await this.service.matchmaking(id, map);
    }
    async history(id) {
        return await this.service.history(id);
    }
};
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/invite'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "Invite", null);
__decorate([
    (0, common_1.Get)("/is_invited/:id"),
    __param(0, (0, common_2.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "is_invited", null);
__decorate([
    (0, common_1.Get)("/invited/confirm/:id/:idgame"),
    __param(0, (0, common_2.Param)("id")),
    __param(1, (0, common_2.Param)("idgame")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "confirm", null);
__decorate([
    (0, common_1.Get)("/invited/reject/:id/:idgame"),
    __param(0, (0, common_2.Param)("id")),
    __param(1, (0, common_2.Param)("idgame")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "reject", null);
__decorate([
    (0, common_1.Get)("/current/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "current", null);
__decorate([
    (0, common_1.Get)("/is_waiting/:id"),
    __param(0, (0, common_2.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "is_begin", null);
__decorate([
    (0, common_1.Post)("/finish/:id/:winner"),
    __param(0, (0, common_2.Param)("id")),
    __param(1, (0, common_2.Param)("winner")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "finishGame", null);
__decorate([
    (0, common_1.Get)("/watch/:id"),
    __param(0, (0, common_2.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "watch", null);
__decorate([
    (0, common_1.Get)("/matchmaking/:id/:map"),
    __param(0, (0, common_2.Param)("id")),
    __param(1, (0, common_2.Param)("map")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "matchmaking", null);
__decorate([
    (0, common_1.Get)("/history/:id"),
    __param(0, (0, common_2.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "history", null);
GameController = __decorate([
    (0, crud_1.Crud)({
        model: {
            type: game_entity_1.Game,
        },
    }),
    (0, common_1.Controller)('game'),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameController);
exports.GameController = GameController;
//# sourceMappingURL=game.controller.js.map