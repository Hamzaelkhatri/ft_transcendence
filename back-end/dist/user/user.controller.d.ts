import { CrudController } from '@nestjsx/crud';
import { User } from './user.entity';
import UserService from './user.service';
export declare class UserController implements CrudController<User> {
    service: UserService;
    constructor(service: UserService);
    get base(): CrudController<User>;
    getService(): UserService;
    getMany(request: any): Promise<import("@nestjsx/crud").GetManyDefaultResponse<User> | User[]>;
    getOne(request: any): Promise<User>;
    createOne(request: any, data: {
        id: number;
        name: string;
        email: string;
        token: string;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date;
        is_online: boolean;
        image: string;
        is_verified: boolean;
        country: string;
        wins: number;
        loses: number;
        quit: number;
        level: number;
    }): Promise<User>;
    getMyData(req: any, res: any): Promise<User>;
    getAllUsers(res: any): Promise<User[]>;
    getNextUser(req: any): Promise<User>;
    getRandomUser(): Promise<User>;
    leaderborad(): Promise<any[]>;
}
