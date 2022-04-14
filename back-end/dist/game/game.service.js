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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const game_entity_1 = require("./game.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("../user/user.service");
let GameService = class GameService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repository, userservice) {
        super(repository);
        this.repository = repository;
        this.userservice = userservice;
    }
    async findAll() {
        return await this.repository.find();
    }
    async Invite(username1, username2, map) {
        let game = new game_entity_1.Game();
        game.userId1 = await this.userservice.getIdbyName(username1);
        game.userId2 = await this.userservice.getIdbyName(username2);
        game.user1 = await this.userservice.getUserById(game.userId1).then(user => {
            return user;
        });
        game.user2 = await this.userservice.getUserById(game.userId2).then(user => {
            return user;
        });
        game.created_at = new Date();
        game.updated_at = new Date();
        game.is_accepted_by_user2 = false;
        game.is_rejected_by_user2 = false;
        game.is_finished = false;
        game.is_started = false;
        game.price = 0;
        game.map = map;
        return await this.repository.save(game);
    }
    async is_invited(id) {
        const user = await this.repository.
            createQueryBuilder('game')
            .leftJoinAndSelect('game.user1', 'user1')
            .leftJoinAndSelect('game.user2', 'user2')
            .where('game.user2.id = :id', { id: id })
            .andWhere('game.is_accepted_by_user2 = :is_accepted_by_user2', { is_accepted_by_user2: false })
            .andWhere('game.is_finished = :is_finished', { is_finished: false })
            .andWhere('game.is_started = :is_started', { is_started: false })
            .getOne();
        return user;
    }
    async confirmInvitation(id, idgame) {
        this.repository.
            createQueryBuilder('game')
            .leftJoinAndSelect('game.user1', 'user1')
            .leftJoinAndSelect('game.user2', 'user2')
            .where('game.id = :id', { id: idgame })
            .where('game.is_accepted_by_user2 = :is_accepted_by_user2', { is_accepted_by_user2: false })
            .where('game.is_finished = :is_finished', { is_finished: false })
            .where('game.is_started = :is_started', { is_started: false })
            .update({
            is_accepted_by_user2: true,
            is_started: true,
            TimeBegin: new Date(),
            TimeEnd: new Date(),
            is_finished: false,
        })
            .execute();
        const user = await this.repository.
            createQueryBuilder('game')
            .leftJoinAndSelect('game.user1', 'user1')
            .leftJoinAndSelect('game.user2', 'user2')
            .where('game.id = :id', { id: idgame })
            .getOne();
        return user;
    }
    async rejectInvitation(id, idgame) {
        const user = await this.repository.
            createQueryBuilder('game')
            .leftJoinAndSelect('game.user1', 'user1')
            .leftJoinAndSelect('game.user2', 'user2')
            .where('game.id = :id', { id: idgame })
            .where('game.is_accepted_by_user2 = :is_accepted_by_user2', { is_accepted_by_user2: false })
            .where('game.is_finished = :is_finished', { is_finished: false })
            .where('game.is_started = :is_started', { is_started: false })
            .update({
            is_rejected_by_user2: true,
            is_finished: true,
            TimeEnd: new Date(),
        })
            .execute();
        return user;
    }
    async currentGames() {
        const user = await this.repository.
            createQueryBuilder('game')
            .leftJoinAndSelect('game.user1', 'user1')
            .leftJoinAndSelect('game.user2', 'user2')
            .where('game.is_accepted_by_user2 = :is_accepted_by_user2', { is_accepted_by_user2: true })
            .andWhere('game.is_finished = :is_finished', { is_finished: false })
            .andWhere('game.is_started = :is_started', { is_started: true })
            .getMany();
        let games = [];
        if (user.length > 0) {
            for (let i = 0; i < user.length; i++) {
                if (user[i].user2.name !== null) {
                    let game = {
                        key: user[i].id,
                        User1: [user[i].user1.name, user[i].user1.image],
                        User2: [user[i].user2.name, user[i].user2.image],
                        Time: user[i].TimeBegin,
                    };
                    games.push(game);
                }
            }
        }
        return games;
    }
    async is_waiting(id) {
        const user = await this.repository.
            createQueryBuilder('game')
            .leftJoinAndSelect('game.user1', 'user1')
            .leftJoinAndSelect('game.user2', 'user2')
            .where('game.user1.id = :id', { id: id })
            .andWhere('game.is_accepted_by_user2 = :is_accepted_by_user2', { is_accepted_by_user2: true })
            .andWhere('game.is_finished = :is_finished', { is_finished: false })
            .andWhere('game.is_started = :is_started', { is_started: true })
            .orderBy('game.created_at', 'DESC')
            .getOne();
        return user;
    }
    async finishGame(id, winner, json) {
        this.repository
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.user1', 'user1')
            .leftJoinAndSelect('game.user2', 'user2')
            .where('game.id = :id', { id: id })
            .andWhere('game.is_accepted_by_user2 = :is_accepted_by_user2', { is_accepted_by_user2: true })
            .andWhere('game.is_finished = :is_finished', { is_finished: false })
            .andWhere('game.is_started = :is_started', { is_started: true })
            .update({
            is_finished: true,
            TimeEnd: new Date(),
            winner: winner,
            price: 100,
            json_map: json,
        })
            .execute();
        const game = await this.repository.
            createQueryBuilder('game')
            .leftJoinAndSelect('game.user1', 'user1')
            .leftJoinAndSelect('game.user2', 'user2')
            .where('game.id = :id', { id: id })
            .getOne();
        const users = await this.userservice.repository.findOne({ id: winner });
        users.wins = users.wins + 1;
        await this.userservice.repository.save(users);
        if (game.user1.id !== winner) {
            let user = await this.userservice.repository.findOne({ id: game.user1.id });
            user.loses = user.loses + 1;
            await this.userservice.repository.save(user);
        }
        else {
            let user = await this.userservice.repository.findOne({ id: game.user2.id });
            user.loses = user.loses + 1;
            await this.userservice.repository.save(user);
        }
        return await game;
    }
    async watch(id) {
        const user = await this.repository.
            createQueryBuilder('game')
            .leftJoinAndSelect('game.user1', 'user1')
            .leftJoinAndSelect('game.user2', 'user2')
            .where('game.id = :id', { id: id })
            .andWhere('game.is_accepted_by_user2 = :is_accepted_by_user2', { is_accepted_by_user2: true })
            .andWhere('game.is_finished = :is_finished', { is_finished: false })
            .andWhere('game.is_started = :is_started', { is_started: true })
            .getOne();
        return user;
    }
    async matchmaking(id, map) {
        const user = await this.repository.
            createQueryBuilder('game')
            .leftJoinAndSelect('game.user1', 'user1')
            .leftJoinAndSelect('game.user2', 'user2')
            .where('game.user2.id IS NULL', {})
            .andWhere('game.is_accepted_by_user2 = :is_accepted_by_user2', { is_accepted_by_user2: false })
            .andWhere('game.is_finished = :is_finished', { is_finished: false })
            .andWhere('game.is_started = :is_started', { is_started: false })
            .andWhere('game.map = :map', { map: map })
            .orderBy('game.created_at', 'DESC')
            .getOne();
        if (user) {
            let t = await this.repository
                .createQueryBuilder('game')
                .update({
                is_accepted_by_user2: true,
                is_started: true,
                TimeBegin: new Date(),
                updated_at: new Date(),
                TimeEnd: new Date(),
                is_finished: false,
                user2: await this.userservice.getUserById(id).then(user => {
                    return user;
                }),
                userId2: id,
            }).execute();
            return await this.repository.
                createQueryBuilder('game')
                .leftJoinAndSelect('game.user1', 'user1')
                .leftJoinAndSelect('game.user2', 'user2')
                .where('game.id = :id', { id: user.id })
                .getOne();
        }
        else {
            const game = new game_entity_1.Game();
            game.user1 = await this.userservice.getUserById(id).then(user => {
                return user;
            });
            game.userId1 = id;
            game.is_accepted_by_user2 = false;
            game.is_finished = false;
            game.is_started = false;
            game.TimeBegin = new Date();
            game.TimeEnd = new Date();
            game.created_at = new Date();
            game.updated_at = new Date();
            game.winner = 0;
            game.price = 100;
            game.map = map;
            return await this.repository.save(game);
        }
    }
    async history(id) {
        const user = await this.repository.
            createQueryBuilder('game')
            .leftJoinAndSelect('game.user1', 'user1')
            .leftJoinAndSelect('game.user2', 'user2')
            .where('game.user1.id = :id', { id: id })
            .orWhere('game.user2.id = :id', { id: id })
            .orderBy('game.created_at', 'DESC')
            .getMany();
        return user;
    }
};
GameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(game_entity_1.Game)),
    __metadata("design:paramtypes", [Object, user_service_1.default])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map