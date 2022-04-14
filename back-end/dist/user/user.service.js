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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repository, connection) {
        super(repository);
        this.connection = connection;
        this.repository = repository;
    }
    async createOne(request, data) {
        let res = await this.findByEmail(data.email).then(user => {
            if (user) {
                return user;
            }
            else {
                return null;
            }
        });
        if (res) {
            return res;
        }
        const user = new user_entity_1.User();
        user.name = data.name;
        user.email = data.email;
        user.image = data.image;
        user.is_online = data.is_online;
        user.token = data.token;
        user.created_at = data.created_at;
        user.updated_at = data.updated_at;
        user.deleted_at = data.deleted_at;
        user.is_verified = data.is_verified;
        this.repository.save(user);
        return user;
    }
    findByEmail(email) {
        return this.repository.findOne({ email: email });
    }
    async getUserByToken(token) {
        return await this.repository.findOne({ token: token });
    }
    fetchAllUsers() {
        return this.repository.find();
    }
    getIdbyName(name) {
        return this.repository.findOne({ name: name }).then(user => {
            return user.id;
        });
    }
    async getUserById(id) {
        return await this.repository.findOne({ id: id });
    }
    async getNextUser() {
        return await this.repository.findOne({ is_online: true });
    }
    async getRandomUser() {
        let ids = await this.repository.find({ is_online: true }).then(users => {
            let ids = [];
            users.forEach(user => {
                ids.push(user.id);
            });
            return ids;
        });
        let random = Math.floor(Math.random() * ids.length);
        return await this.repository.findOne({ id: ids[random] });
    }
    async leaderboard() {
        const user = await this.repository.
            createQueryBuilder('user')
            .orderBy('user.wins', 'ASC')
            .getMany();
        let winners = [];
        for (let i = 0; i < user.length; i++) {
            let winner = {
                Name: [user[i].name, user[i].image],
                Rank: user[i].wins,
                Contry: user.contry,
                key: i,
            };
            winners.push(winner);
        }
        return winners;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, typeorm_2.Connection])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.service.js.map