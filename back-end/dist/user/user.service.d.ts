import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { CrudRequest } from '@nestjsx/crud';
import { Connection } from 'typeorm';
export default class UserService extends TypeOrmCrudService<User> {
    private connection;
    repository: any;
    constructor(repository: any, connection: Connection);
    createOne(request: CrudRequest, data: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User>;
    getUserByToken(token: string): Promise<User>;
    fetchAllUsers(): Promise<User[]>;
    getIdbyName(name: string): number;
    getUserById(id: number): Promise<User>;
    getNextUser(): Promise<User>;
    getRandomUser(): Promise<User>;
    leaderboard(): Promise<any[]>;
}
