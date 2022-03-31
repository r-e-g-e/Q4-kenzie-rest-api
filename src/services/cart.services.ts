import { getCustomRepository } from "typeorm"
import CartRepository from "../repositories/cart.repository"
import ItemCardRepository from "../repositories/itemCard.repository"

interface Iitem{
  itemId: number
  quantity: number
}

export async function getAllItens(userId:string){
  const cartRepository = getCustomRepository(CartRepository)
  const itemCardRepository = getCustomRepository(ItemCardRepository)

  const cart = await cartRepository.findOne({
    where:{
      userId
    }
  })

  const itens = await itemCardRepository.find({
    where:{
      cartId: cart.id
    },
    select:[
      "id",
      "itemId",
      "quantity",
    ],
    loadRelationIds:true
  })

  return itens
}

export async function addItem(userId:string, {itemId, quantity}:Iitem){
  const cartRepository = getCustomRepository(CartRepository)
  const itemCardRepository = getCustomRepository(ItemCardRepository)

  const cart = await cartRepository.findOne({
    where:{
      userId
    }
  })

  const newItem = itemCardRepository.create({
    cartId: cart.id,
    itemId,
    quantity
  })

  await itemCardRepository.save(newItem)
  
  return newItem
}

export async function removeItem(userId:string, itemId: string){
  const cartRepository = getCustomRepository(CartRepository)
  const itemCardRepository = getCustomRepository(ItemCardRepository)

  const cart = await cartRepository.findOne({
    where:{
      userId
    }
  })

  const itemToRemove = await itemCardRepository.findOne({
    where:{
      id: itemId,
      cartId: cart.id
    }
  })

  if(itemToRemove){
    await itemCardRepository.delete(itemToRemove)
    return true
  }
  
  return false
}

export async function updateItemQuantity(cardItemId:string, quantity:number){
  const itemCardRepository = getCustomRepository(ItemCardRepository)

  const item = await itemCardRepository.findOne({
    where:{
      id: cardItemId
    }
  })

  item.quantity = quantity

  return await itemCardRepository.save(item)
}