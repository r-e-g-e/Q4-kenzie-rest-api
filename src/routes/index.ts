import { Router } from "express"
import cartRoutes from "./cart.routes"
import userRoutes from "./user.routes"

const routes:Array<Router> = [cartRoutes, userRoutes]

export default routes