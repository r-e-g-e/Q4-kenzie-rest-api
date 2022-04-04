import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import User from "./User"

@Entity("carts")
export default class Cart{
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @OneToOne( () => User, user => user.id, {
    nullable: true,
    onDelete:"SET NULL",
    onUpdate:"CASCADE"
  })
  @JoinColumn()
  userId: string
}