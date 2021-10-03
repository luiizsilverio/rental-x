import 'reflect-metadata'
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { AppError } from "@errors/AppError"
import { CreateRentalUseCase } from "@modules/rentals/useCases/createRental/CreateRentalUseCase"
import { RentalsRepositoryInMemory } from "./repositories/RentalsRepositoryInMemory"
import { CarsRepositoryInMemory } from './repositories/CarsRepositoryInMemory'

dayjs.extend(utc)

let createRentalUseCase: CreateRentalUseCase
let rentalsRepository: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Rental", () => {
  const vdata = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository, carsRepositoryInMemory)
  })

  it("should be able to create a new rental", async () => {    
    const car = await carsRepositoryInMemory.create({
      name: "Teste",
      description: "car test",
      daily_rate: 100,
      plate: "abc",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    })

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: vdata
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should be able to create another rental for the same user", async () => {    
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "11111",
        expected_return_date: vdata
      })
  
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "22222",
        expected_return_date: vdata
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to create another rental for the same car", async () => {    
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "11111",
        expected_return_date: vdata
      })
  
      await createRentalUseCase.execute({
        user_id: "22222",
        car_id: "11111",
        expected_return_date: vdata
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to create a new rental with invalid return time", async () => {    
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "11111",
        expected_return_date: dayjs().toDate()
      })    
    }).rejects.toBeInstanceOf(AppError)
  })
})