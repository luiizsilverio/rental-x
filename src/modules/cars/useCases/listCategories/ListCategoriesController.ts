import { Request, Response } from 'express'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

class ListCategoriesController {
  private listCategories: ListCategoriesUseCase

  constructor(listCategories: ListCategoriesUseCase) {
    this.listCategories = listCategories
  }

  handle(request: Request, response: Response): Response {
    const all = this.listCategories.execute()

    return response.json(all)
  }
}

export { ListCategoriesController }
