import { IUsersRepository } from "../IUsersRepository";
import { ICreateUser } from "../../dtos/ICreateUserDTO";
import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";

class UsersRepository implements IUsersRepository {
   private repository: Repository<User>
   
   constructor() {
      this.repository = getRepository(User)
   }

   async create(data: ICreateUser): Promise<void> {      
      const user = this.repository.create({
         name: data.name,
         email: data.email,
         cnh: data.cnh,
         password: data.password
      })

      await this.repository.save(user)
   }   

   async findByEmail(email: string): Promise<User> {
      const user = await this.repository.findOne({email})
      return user
   }

}

export { UsersRepository }