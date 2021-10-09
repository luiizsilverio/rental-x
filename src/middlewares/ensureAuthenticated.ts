import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

import auth from "@config/auth"
import { AppError } from "../errors/AppError"
import { UsersTokensRepository } from "@modules/accounts/repositories/implementations/UsersTokensRepository"
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository"

interface IPayload {
   sub: string
}

export async function ensureAuthenticated(
   request: Request, 
   response: Response, 
   next: NextFunction
) {

   const authHeader = request.headers.authorization

   if (!authHeader) {
      throw new AppError("Token missing", 401)
   }

   const [,token] = authHeader.split(" ") //Bearer token

   try {
      const { sub: user_id } = verify(
         token, 
         auth.secret
      ) as IPayload
     
      next()

   } catch {
      throw new AppError("Invalid token", 401)
   }
}