import { Request, Response } from 'express'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

class CreateSpecificationController {
  private createSpecification: CreateSpecificationUseCase

  constructor(createSpecificationUseCase: CreateSpecificationUseCase) {
    this.createSpecification = createSpecificationUseCase
  }

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body
  
    const specification = this.createSpecification.execute({ name, description })

    return response.status(201).json(specification)
  }
}

export { CreateSpecificationController }