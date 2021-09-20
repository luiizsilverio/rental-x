import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../errors/AppError"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {

  constructor(
    @inject("CategoriesRepository")
    private repository: ICategoriesRepository) {
  }

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryJaExiste = await this.repository.findByName(name)

    if (categoryJaExiste) {
      throw new AppError("Categoria já existe ")
    }

    await this.repository.create({ name, description })
  }
}

export { CreateCategoryUseCase }