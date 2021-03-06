import 'reflect-metadata'
import { AppError } from "@errors/AppError"
import { CreateCarSpecificationUseCase } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase"
import { CarsRepositoryInMemory } from "./repositories/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "./repositories/SpecificationRepositoryInMemory"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepository: SpecificationRepositoryInMemory

describe("Create Car Specification", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepository = new SpecificationRepositoryInMemory()
    
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepository
    )
  })

  it("should not be able to add a specification to a non-existent car", async () => {
    expect(async () => {
      const car_id = "1234"
      const specifications_id = ["1234"]
      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to add a new car specification", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Clio", 
      description: "lorem ipsum", 
      daily_rate: 100, 
      plate: "ABC-1234", 
      fine_amount: 30, 
      brand: "Renault", 
      category_id: "1234" 
    })

    const specification = await specificationsRepository.create({
      name: "especificação teste",
      description: "lorem ipsum"
    })

    const car_id = car.id
    const specifications_id = [specification.id]

    const spec_cars = await createCarSpecificationUseCase.execute({ 
      car_id, 
      specifications_id 
    })

    expect(spec_cars).toHaveProperty("specifications")
    expect(spec_cars.specifications.length).toBe(1)
  })
})