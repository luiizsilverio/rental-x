import { Category } from "../entities/Category";

interface ICreateCategory {
  name: string
  description: string
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategory): Promise<Category>
  list(): Promise<Category[]>
  findByName(name: string): Promise<Category>
  findById(id: string): Promise<Category>
}

export { ICategoriesRepository, ICreateCategory }