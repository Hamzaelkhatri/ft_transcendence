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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const crud_1 = require("@nestjsx/crud");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
let UserController = class UserController {
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
    async getMyData(req, res) {
        console.log('Cookies: ', req.cookies);
        let user = await this.service.getUserByToken(req.body.token).then(user => {
            if (user)
                return user;
            else
                return null;
        });
        res.json(user);
        return user;
    }
    async getAllUsers(res) {
        return await this.service.fetchAllUsers();
    }
    async getNextUser(req) {
        console.log(req);
        return await this.service.getNextUser();
    }
    async getRandomUser() {
        return await this.service.getRandomUser();
    }
    async leaderborad() {
        return await this.service.leaderboard();
    }
};
__decorate([
    (0, common_1.Post)("me"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyData", null);
__decorate([
    (0, common_1.Get)("all"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)("/next/"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getNextUser", null);
__decorate([
    (0, common_1.Get)("/random/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getRandomUser", null);
__decorate([
    (0, common_1.Get)("/leaderboard/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "leaderborad", null);
UserController = __decorate([
    (0, crud_1.Crud)({
        model: {
            type: user_entity_1.User,
        }
    }),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.default])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map