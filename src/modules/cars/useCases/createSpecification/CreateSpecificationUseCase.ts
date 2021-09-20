import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../errors/AppError"
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  
  constructor(
    @inject("SpecificationsRepository") 
    private repository: ISpecificationsRepository) {
  }

  async execute({ name, description }: IRequest): Promise<void> {
    const jaExiste = await this.repository.findByName(name)

    if (jaExiste) {
      throw new AppError("Specification already exists!")
    }
    
    await this.repository.create({ name, description })
  }
}

export { CreateSpecificationUseCase }