import { getRepository, Repository } from 'typeorm'
import { Category } from '../../entities/Category'
import { ICategoriesRepository, ICreateCategory } from '../ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  // private static INSTANCE: CategoriesRepository
  // private constructor() {
  //   this.repository = getRepository(Category)
  // }
  // public static getInstance(): CategoriesRepository {
  //   if (!this.INSTANCE) {
  //     this.INSTANCE = new CategoriesRepository()
  //   }
  //   return this.INSTANCE
  // }

  async create({ name, description }: ICreateCategory): Promise<Category> {
    const category = this.repository.create({
      description,
      name
    })
    
    await this.repository.save(category)
    return category
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name })

    return category
  }

  async findById(id: string): Promise<Category> {
    const category = await this.repository.findOne(id)

    return category
  }
}

export { CategoriesRepository }