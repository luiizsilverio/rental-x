import 'reflect-metadata'
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { AppError } from "@errors/AppError"
import { CreateRentalUseCase } from "@modules/rentals/useCases/CreateRentalUseCase"
import { RentalsRepositoryInMemory } from "./repositories/RentalsRepositoryInMemory"

dayjs.extend(utc)

let createRentalUseCase: CreateRentalUseCase
let rentalsRepository: RentalsRepositoryInMemory

describe("Create Rental", () => {
  const vdata = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository)
  })

  it("should be able to create a new rental", async () => {    
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
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