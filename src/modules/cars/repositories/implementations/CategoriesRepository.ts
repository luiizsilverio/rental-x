import { Repository, getRepository } from 'typeorm'
import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../ICategoriesRepository'

interface ICreateCategory {
  name: string
  description: string
}

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  async create({ name, description }: ICreateCategory): Promise<void> {
    const category = await this.repository.create({
      name,
      description
    })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name })
    return category
  }

}

export { CategoriesRepository }