import { EntityRepository, Repository } from "typeorm"
import Item from "../entities/Item"

@EntityRepository(Item)
export default class ItemRepository extends Repository<Item>{
  async populateTable(){
    await this.query(`
      INSERT INTO 
        itens ("name", "price") 
      VALUES 
        ('Banana', 21),
        ('Maçâ', 61),
        ('Pera', 16),
        ('Honda civic', 600),
        ('Lampada', 20),
        ('Pão', 70);
    `)
  }
}