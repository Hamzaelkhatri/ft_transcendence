import UserService from '../user/user.service';
import { User } from 'src/user/user.entity';
export declare class AuthService {
    userService: UserService;
    constructor(userService: UserService);
    validateUser(token: any, req: any): Promise<User>;
}
