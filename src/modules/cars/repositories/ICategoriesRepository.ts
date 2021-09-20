import { Category } from "../entities/Category";

export interface ICategoriesRepository {
  create({ name, description }): Promise<void>
  findByName(name: string): Promise<Category>
  list(): Promise<Category[]>
}
