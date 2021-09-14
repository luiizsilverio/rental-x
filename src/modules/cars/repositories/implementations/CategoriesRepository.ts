import { Repository } from 'typeorm'
import { Category } from '../../entities/Category'
import { ICategoriesRepository, ICreateCategory } from '../ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  private static INSTANCE: CategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!this.INSTANCE) {
      this.INSTANCE = new CategoriesRepository()
    }

    return this.INSTANCE
  }

  create({ name, description }: ICreateCategory): Category {
    const category = new Category()

    Object.assign(category, {
      name,
      description
    })
    
    this.categories.push(category)
    return category
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string): string | undefined {
    const category = this.categories.find(cat => cat.name === name)

    return category?.id
  }

  findById(id: string): Category | undefined {
    const category = this.categories.find(cat => cat.id === id)

    return category
  }
}

export { CategoriesRepository }