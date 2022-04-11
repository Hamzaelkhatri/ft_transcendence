import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { Game } from "src/core/entities/game.entity";
import { User } from "src/core/entities/user.entity";


export const config:TypeOrmModuleOptions = 
{
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    entities: ["dist/**/*.entity.js"]
};
