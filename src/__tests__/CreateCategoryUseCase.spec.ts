import 'reflect-metadata'
import { AppError } from '@errors/AppError'
import { CreateCategoryUseCase } from "@modules/cars/useCases/createCategory/CreateCategoryUseCase"
import { CategoriesRepositoryInMemory } from "./repositories/CategoriesRepositoryInMemory"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepository: CategoriesRepositoryInMemory

describe("Create category", () => {
  
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
  })

  it("should be able to create a new category", async() => {
    const category = {
      name: "Categoria",
      description: "Categoria Teste"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })

    const newCategory = await categoriesRepository.findByName(category.name)

    expect(newCategory).toHaveProperty("id")
  })

  it("should not be able to create a duplicated category", async() => {
    const category = {
      name: "Categoria",
      description: "Categoria Teste"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })
    
    await expect(createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      })
    ).rejects.toEqual(new AppError("Categoria já existe"))    
  })
})
