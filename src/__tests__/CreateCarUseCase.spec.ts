import { AppError } from "@errors/AppError"
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
    const car = await createCarUseCase.execute({
      name: "Clio", 
      description: "Description",
      daily_rate: 100,
      plate: "ABC1234",
      fine_amount: 50,
      brand: "Brand", 
      category_id: "category"
    })

    expect(car).toHaveProperty("id")
  })

  
  it("should not be able to create a car with the same plate", () => {
    expect(async () => {
      const car = await createCarUseCase.execute({
        name: "Car 1", 
        description: "Description",
        daily_rate: 100,
        plate: "ABC1234",
        fine_amount: 50,
        brand: "Brand", 
        category_id: "category"
      })

      await createCarUseCase.execute({
        name: "Car 2", 
        description: "Description",
        daily_rate: 100,
        plate: "ABC124",
        fine_amount: 50,
        brand: "Brand", 
        category_id: "category"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
  

  it("should be able to create a car with disponibility", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available", 
      description: "Description",
      daily_rate: 100,
      plate: "ABC1234",
      fine_amount: 50,
      brand: "Brand", 
      category_id: "category"
    })

    expect(car.available).toBe(true)
  })
})
