import { getCustomRepository } from "typeorm"
import UserRepository from "../repositories/user.repository"
import CartRepository from "../repositories/cart.repository"
import { hash, compare } from "bcryptjs"
import ErrorHTTP from "../error/ErrorHTTP"
import { sign } from "jsonwebtoken"

interface ICreateJWT{
  email: string
  password: string
}

interface ICreateUser extends ICreateJWT{
  name: string
}


export async function createUser({ email, name, password }:ICreateUser) {
  const userRepository = getCustomRepository(UserRepository)
  const cartRepository = getCustomRepository(CartRepository)

  const doUserExists = await userRepository.findOne({
    where:{
      email
    }
  })

  if(doUserExists){
    throw new ErrorHTTP("User already exists!", 422)
  }

  const hashedPassword = await hash(password, 8)

  const userToSave = userRepository.create({
    password: hashedPassword,
    name,
    email
  })

  const savedUser = await userRepository.save(userToSave)

  const cart = cartRepository.create({
    userId: savedUser.id
  })

  await cartRepository.save(cart)
  
  return userToSave
}

export async function createJWT({ email, password }:ICreateJWT) {
  const userRepository = getCustomRepository(UserRepository)

  const user = await userRepository.findOne({
    where:{
      email
    }
  })

  if(!user){
    throw new ErrorHTTP("Wrong email or password!", 401)
  }
  
  const isPasswordCorrect = await compare(password, user.password)
  
  if(!isPasswordCorrect){
    throw new ErrorHTTP("Wrong email or password!", 401)
  }

  const jwt = sign({userId:user.id}, process.env.JWT_SECRET, {expiresIn: "3h"})

  return jwt
}
