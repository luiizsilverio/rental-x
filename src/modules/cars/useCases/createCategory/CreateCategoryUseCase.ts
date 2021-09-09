import { Category } from "../../model/Category"
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

  execute({ name, description }: IRequest): Category {
    const categoryJaExiste = this.repository.findByName(name)

    if (categoryJaExiste) {
      throw new Error("Categoria já existe ")
    }

    const category = this.repository.create({ name, description })

    return category
  }
}

export { CreateCategoryUseCase }