import { Entity, PrimaryGeneratedColumn,PrimaryColumn, Column } from 'typeorm';
 
@Entity("_User")
export class User {
  @PrimaryColumn()
  id: number;
 
  @Column()
  name: string;
 
  @Column()
  salary: number;
 
  @Column()
  age: number;

  //create a new user in the database
  
}
