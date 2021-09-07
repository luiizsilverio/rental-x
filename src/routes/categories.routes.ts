import { Router } from 'express'
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { createCategoryController } from '../modules/cars/useCases/createCategory'

const categoriesRoutes = Router()
const repository = new CategoriesRepository()

categoriesRoutes.get('/', (request, response) => {
  
})

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response)
	
})

export { categoriesRoutes }