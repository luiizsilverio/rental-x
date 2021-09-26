import { AppError } from "@errors/AppError"
import { CreateCarSpecificationUseCase } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase"
import { CarsRepositoryInMemory } from "./repositories/CarsRepositoryInMemory"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car Specification", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory)
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

    const car_id = car.id
    const specifications_id = ["1234"]
    await createCarSpecificationUseCase.execute({ car_id, specifications_id })
  })
})