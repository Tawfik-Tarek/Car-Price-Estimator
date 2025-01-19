import { Entity, PrimaryGeneratedColumn , Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;

  email: string;

  password: string;

}