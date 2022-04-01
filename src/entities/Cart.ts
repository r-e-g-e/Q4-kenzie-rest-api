import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, JoinTable, OneToMany } from "typeorm"
import User from "./User"
import ItemCard from "./ItemCart"

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

  @OneToMany( () => ItemCard, item => item)
  @JoinTable()
  itens: ItemCard[]
}