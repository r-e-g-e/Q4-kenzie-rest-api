import { getCustomRepository } from "typeorm"
import CartRepository from "../repositories/cart.repository"
import ItemCartRepository from "../repositories/itemCard.repository"

interface Iitem{
  itemId: number
  quantity: number
}

export async function getAllItens(userId:string){
  const cartRepository = getCustomRepository(CartRepository)
  const itemCartRepository = getCustomRepository(ItemCartRepository)

  const cart = await cartRepository.findOne({
    where:{
      userId
    }
  })

  const itens = await itemCartRepository.find({
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
  const itemCartRepository = getCustomRepository(ItemCartRepository)

  const cart = await cartRepository.findOne({
    where:{
      userId
    }
  })

  const newItem = itemCartRepository.create({
    cartId: cart.id,
    itemId,
    quantity
  })

  await itemCartRepository.save(newItem)
  
  return newItem
}

export async function removeItem(userId:string, itemId: string){
  const cartRepository = getCustomRepository(CartRepository)
  const itemCartRepository = getCustomRepository(ItemCartRepository)

  const cart = await cartRepository.findOne({
    where:{
      userId
    }
  })

  const itemToRemove = await itemCartRepository.findOne({
    where:{
      id: itemId,
      cartId: cart.id
    }
  })

  if(itemToRemove){
    await itemCartRepository.delete(itemToRemove)
    return true
  }
  
  return false
}

export async function updateItemQuantity(cartItemId:string, quantity:number){
  const itemCartRepository = getCustomRepository(ItemCartRepository)

  const item = await itemCartRepository.findOne({
    where:{
      id: cartItemId
    }
  })

  item.quantity = quantity

  return await itemCartRepository.save(item)
}