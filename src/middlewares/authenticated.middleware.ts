import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface token{
  userId:string
  iat:number
  exp:number
}

export default function(req:Request, res:Response, next:NextFunction){
  let token = req.headers.authorization

  if(!token){
    return res.status(401).json({"error":"Unauthorized"})
  }

  token = token.split(" ")[1]

  const { userId } = verify(token, process.env.JWT_SECRET ) as token
  
  req.userId = userId

  next()
}