import { Request, Response } from 'express'

class ListCategoriesController {
  handle(request: Request, response: Response): Response {
    const all = repository.list()

    return response.json(all)
  }
}

export { ListCategoriesController }
