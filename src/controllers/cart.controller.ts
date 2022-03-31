import { Request, Response } from "express"
import { getAllItens, addItem, removeItem, updateItemQuantity } from "../services/cart.services"

class CartController{
  async getAllItens(req:Request, res:Response){
    const userId = req.userId

    const itens = await getAllItens(userId)

    return res.json({itens})
  }

  async addItem(req:Request, res:Response){
    const userId = req.userId
    const { quantity, id } = req.body

    if(quantity === undefined || id === undefined){
      return res.status(400)
        .json({"error": "The following fields are required: quantity & id"})
    }
    
    const newItem = await addItem(userId, { quantity, itemId: id })

    return res.status(201).json(newItem)
  }

  async removeItem(req:Request, res:Response){
    const userId = req.userId
    const { id } = req.params

    const itemRemoved = await removeItem(userId, id)

    if(itemRemoved){
      return res.sendStatus(204)
    }

    return res.status(404).json({"error":"Item not found."})
  }

  async updateItemQuantity(req:Request, res:Response){
    const { id } = req.params
    const { quantity } = req.body

    if(quantity === undefined){
      return res.status(400)
        .json({"error":"field 'quantity' is required."})
    }

    const item = await updateItemQuantity(id, quantity)

    return res.status(200).json(item)
  }
}

export default new CartController()