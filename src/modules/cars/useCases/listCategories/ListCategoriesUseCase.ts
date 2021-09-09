import { Category } from '../../model/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

class ListCategoriesUseCase {
  private repository: ICategoriesRepository

  constructor(repository: ICategoriesRepository) {
    this.repository = repository
  }

  execute(): Category[] {
    const categories = this.repository.list()

    return categories
  }  
}

export { ListCategoriesUseCase }