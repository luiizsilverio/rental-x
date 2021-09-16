import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt"

import { ICreateUser } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {

   constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository
   ) {}

   async execute({ name, email, password, cnh }: ICreateUser): Promise<void> {
      const userExists = await this.usersRepository.findByEmail(email)

      if (userExists) {
         throw new Error("User already exists")
      }

      const hashedPass = await hash(password, 8)

      await this.usersRepository.create({
         name,
         email,
         password: hashedPass,
         cnh
      })
   }
}

export { CreateUserUseCase }