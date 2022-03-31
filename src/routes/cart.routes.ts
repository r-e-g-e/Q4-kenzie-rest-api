import { Router } from "express"
import authMiddleware from "../middlewares/authenticated.middleware"
import cartController from "../controllers/cart.controller"

const cartRoutes = Router()


cartRoutes.get("/product", authMiddleware, cartController.getAllItens)
cartRoutes.post("/product", authMiddleware, cartController.addItem)
cartRoutes.delete("/product/:id", authMiddleware, cartController.removeItem)
cartRoutes.patch("/product/:id", authMiddleware, cartController.updateItemQuantity)


export default cartRoutes