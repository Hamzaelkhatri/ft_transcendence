"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const passport_1 = require("@nestjs/passport");
const app_gateway_1 = require("./app.gateway");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user/user.entity");
const game_module_1 = require("./game/game.module");
const game_entity_1 = require("./game/game.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, passport_1.AuthModuleOptions, config_1.ConfigModule.forRoot(), typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: '192.168.63.100',
                port: 5432,
                username: 'helkhatr',
                password: '',
                database: 'helkhatr',
                entities: [user_entity_1.User, game_entity_1.Game],
                synchronize: true,
            }), user_module_1.UserModule, game_module_1.GameModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, passport_1.AuthModuleOptions, app_gateway_1.AppGateway],
        exports: [app_gateway_1.AppGateway],
    })
], AppModule);
exports.AppModule = AppModule;
``;
//# sourceMappingURL=app.module.js.map