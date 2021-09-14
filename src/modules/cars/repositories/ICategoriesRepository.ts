import { Category } from "../entities/Category";

interface ICreateCategory {
  name: string
  description: string
}

interface ICategoriesRepository {
  findByName(name: string): string | undefined
  findById(id: string): Category | undefined
  list(): Category[]
  create({ name, description }: ICreateCategory): Category
}

export { ICategoriesRepository, ICreateCategory }