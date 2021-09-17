import { ICreateUser } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
   create(data: ICreateUser): Promise<void>
   findByEmail(email: string): Promise<User>
   findById(id: string): Promise<User>
}
