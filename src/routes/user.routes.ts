import { Router } from "express"
import userController from "../controllers/user.controller"

const userRoutes = Router()

userRoutes.post("/user/signup", userController.createUser)
userRoutes.post("/user/signin", userController.createJWT)

export default userRoutes