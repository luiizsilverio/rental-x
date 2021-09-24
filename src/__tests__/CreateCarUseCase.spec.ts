import { CreateCarUseCase } from "@modules/cars/useCases/createCar/CreateCarUseCase"
import { CarsRepositoryInMemory } from "./repositories/CarsRepositoryInMemory"

let createCarUseCase: CreateCarUseCase
let carsRepository: CarsRepositoryInMemory

describe("Create car", () => {

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepository)
  })

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Clio", 
      description: "Description",
      daily_rate: 100,
      plate: "ABC1234",
      fine_amount: 50,
      brand: "Brand", 
      category_id: "category"
    })
  })
})