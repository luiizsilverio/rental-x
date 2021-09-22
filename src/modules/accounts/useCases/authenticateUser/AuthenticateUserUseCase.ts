import { inject, injectable } from "tsyringe";
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { AppError } from "@errors/AppError"

interface IRequest {
   email: string
   password: string
}

interface IResponse {
   user: {
      name: string,
      email: string
   },
   token: string
}

@injectable()
class AuthenticateUserUseCase {
   constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository
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
      const token = sign({}, "ignite2021", {
         subject: user.id,
         expiresIn: "1d"
      })

      return {
         user: { name, email },
         token
      }
   }
}

export { AuthenticateUserUseCase }