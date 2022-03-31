import { EntityRepository, Repository } from "typeorm"
import Item from "../entities/Item"

@EntityRepository(Item)
export default class ItemRepository extends Repository<Item>{
  async populateTable(){
    await this.query(`
      INSERT INTO 
        itens ("name", "price") 
      VALUES 
        ('banana', 21),
        ('maça', 61),
        ('Pera', 16),
        ('Honda civic', 600),
        ('Lampada', 20),
        ('Pão', 70);
    `)
  }
}