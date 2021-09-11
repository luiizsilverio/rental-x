import { Category } from "../../entities/Category"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface IRequest {
  name: string
  description: string
}

class CreateCategoryUseCase {
  private repository: ICategoriesRepository

  constructor(repository: ICategoriesRepository) {
    this.repository = repository
  }

  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryJaExiste = this.repository.findByName(name)

    if (categoryJaExiste) {
      throw new Error("Categoria já existe ")
    }

    const category = await this.repository.create({ name, description })

    return category
  }
}

export { CreateCategoryUseCase }