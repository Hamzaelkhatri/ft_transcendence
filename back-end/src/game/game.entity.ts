import { Column, Entity,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/user.entity";

@Entity('game')
export class Game
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column({default:new Date()})
    created_at: Date;

    @Column({default:new Date()})
    updated_at: Date;

    //foreign key for user
    @ManyToOne(type => User, user => user.id)
    user1: User;

    @ManyToOne(type => User, user => user.id)
    user2: User;

    @Column({default:new Date()})
    TimeBegin: Date;

    @Column({default:new Date()})
    TimeEnd: Date;

    @Column({default:0})
    winner: number;

    @Column()
    is_finished: boolean;

    @Column({default:false})
    is_started: boolean;

    @Column({default:false})
    is_canceled: boolean;

    @Column({default:false})
    is_rejected: boolean;

    @Column({default:true})
    is_accepted_by_user1: boolean;

    @Column({default:false})
    is_accepted_by_user2: boolean;
}