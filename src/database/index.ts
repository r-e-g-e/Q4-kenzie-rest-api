import { createConnection, getCustomRepository } from "typeorm"
import ItemRepository from "../repositories/item.repository"

export default async function(){
  await createConnection()
  console.log("Connected to database!")

  const itemRepository = getCustomRepository(ItemRepository)
  const itensAmount = await itemRepository.findAndCount()
  
  if(!itensAmount[1]){
    await itemRepository.populateTable()
  }
}