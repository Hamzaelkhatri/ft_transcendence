import { User } from "src/user/user.entity";
export declare class Game {
    id: number;
    price: number;
    created_at: Date;
    updated_at: Date;
    user1: User;
    userId1: number;
    user2: User;
    userId2: number;
    TimeBegin: Date;
    TimeEnd: Date;
    winner: number;
    is_finished: boolean;
    is_started: boolean;
    is_rejected_by_user1: boolean;
    is_rejected_by_user2: boolean;
    is_accepted_by_user2: boolean;
    map: string;
    json_map: string;
}
