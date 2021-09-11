import { Request, Response } from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
  private createCategory: CreateCategoryUseCase

  constructor(createCategoryUseCase: CreateCategoryUseCase) {
    this.createCategory = createCategoryUseCase
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body
  
    const category = await this.createCategory.execute({ name, description })

    return response.status(201).json(category)
  }
}

export { CreateCategoryController }