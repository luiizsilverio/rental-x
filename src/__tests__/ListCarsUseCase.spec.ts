import 'reflect-metadata'
import { ListCarsUseCase } from "@modules/cars/useCases/listCars/ListCarsUseCase"
import { CarsRepositoryInMemory } from './repositories/CarsRepositoryInMemory'

let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all available cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car 1", 
      description: "Description",
      daily_rate: 100,
      plate: "ABC1234",
      fine_amount: 50,
      brand: "Brand", 
      category_id: "category"
    })

    const cars = await listCarsUseCase.execute({})
        
    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2", 
      description: "Description",
      daily_rate: 100,
      plate: "ABC1234",
      fine_amount: 50,
      brand: "Volkswagen", 
      category_id: "category"
    })

    const cars = await listCarsUseCase.execute({
      brand: "Volkswagen"
    })
    
    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fusca", 
      description: "Description",
      daily_rate: 100,
      plate: "ABC1234",
      fine_amount: 50,
      brand: "Volkswagen", 
      category_id: "category"
    })

    const cars = await listCarsUseCase.execute({
      name: "Fusca"
    })
    
    expect(cars).toEqual([car])
  })
})