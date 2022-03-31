import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("users")
export default class User{
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string
}