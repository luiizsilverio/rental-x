import { Category } from "../../src/modules/cars/entities/Category";
import { ICategoriesRepository } from "../../src/modules/cars/repositories/ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = []

  async create({ name, description }: { name: any; description: any; }): Promise<void> {
    const category = new Category()
    category.name = name
    category.description = description
    this.categories.push(category)    
  }
  
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name)
    return category
  }

  async list(): Promise<Category[]> {
    return this.categories
  }
}

export { CategoriesRepositoryInMemory }