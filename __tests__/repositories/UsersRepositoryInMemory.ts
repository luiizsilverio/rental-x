import { ICreateUser } from "../../src/modules/accounts/dtos/ICreateUserDTO";
import { User } from "../../src/modules/accounts/entities/User";
import { IUsersRepository } from "../../src/modules/accounts/repositories/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create({ name, email, password, cnh }: ICreateUser): Promise<void> {
    const user = new User()

    Object.assign(user, { name, email, password, cnh })

    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email)    
  }
  
  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id)     
  }

}

export { UsersRepositoryInMemory }