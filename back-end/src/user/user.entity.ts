import { Column, Entity,ManyToOne,PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User 
{
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar', { length: 255 })
    name: string

    @Column()
    email: string

    @Column()
    token: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @Column()
    deleted_at: Date

    @Column()
    is_online: boolean

    @Column()
    image: string
    
    @Column()
    is_verified: boolean
    
    @Column({default:'moroccan'})
    country: string

    @Column({default:0})
    level: number

    @Column({default:0})
    wins: number

    @Column({default:0})
    loses: number

    @Column({default:0})
    quit: number
}

