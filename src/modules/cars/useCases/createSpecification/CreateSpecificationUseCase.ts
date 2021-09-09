import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"

interface IRequest {
  name: string
  description: string
}

class CreateSpecificationUseCase {
  private repository: ISpecificationsRepository
  
  constructor(repository) {
    this.repository = repository  
  }

  execute({ name, description }: IRequest): void {
    const jaExiste = this.repository.findByName(name)

    if (jaExiste) {
      throw new Error("Specification already exists!")
    }
    
    this.repository.create({
      name,
      description
    })
  }
}

export { CreateSpecificationUseCase }