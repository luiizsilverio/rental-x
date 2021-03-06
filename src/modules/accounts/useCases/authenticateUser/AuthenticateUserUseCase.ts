import { inject, injectable } from "tsyringe";
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { AppError } from "@errors/AppError"
import auth from '@config/auth'
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import dayjs from "dayjs";

interface IRequest {
   email: string
   password: string
}

interface IResponse {
   user: {
      name: string,
      email: string
   },
   token: string,
   refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
   constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository,
      @inject("UsersTokensRepository")
      private usersTokensRepository: IUsersTokensRepository
   ){}
   
   async execute({ email, password }: IRequest): Promise<IResponse> {
      const user = await this.usersRepository.findByEmail(email)
      
      if (!user) {
         throw new AppError("Email or password incorrect")
      }
      
      const { name } = user
      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
         throw new AppError("Email or password incorrect")
      }

      // gerar o token
      const token = sign({}, auth.secret, {
         subject: user.id,
         expiresIn: auth.expiresIn //"1d"
      })

      const refresh_token = sign({ email }, 
         auth.secret_refresh_token, {
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token
         }
      )

      await this.usersTokensRepository.create({
         user_id: user.id,
         refresh_token,
         expires_date: dayjs().add(30, 'days').toDate()
      })

      return {
         user: { name, email },
         token,
         refresh_token
      }
   }
}

export { AuthenticateUserUseCase }