import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("itens")
export default class Item{
  @PrimaryGeneratedColumn("increment")
  readonly id: number

  @Column()
  name: string

  @Column()
  price: number
}