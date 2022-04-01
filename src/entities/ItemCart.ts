import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column } from "typeorm"
import Cart from "./Cart"
import Item from "./Item"

@Entity("item_cart")
export default class ItemCard{
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @ManyToOne( () => Cart, cart => cart.id)
  @JoinColumn()
  cartId: string
  
  @ManyToOne( () => Item, item => item.id)
  @JoinColumn()
  itemId: number

  @Column()
  quantity: number
} 