import { inject, injectable } from "tsyringe"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { AppError } from "@errors/AppError"
import { Rental } from "@modules/rentals/entities/Rental"
import { IRentalsRepository } from "../repositories/IRentalsRepository"

dayjs.extend(utc)

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private repository: IRentalsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date
  }): Promise<Rental> {

    const car = await this.repository.findByCar(car_id)

    if (car) {
      throw new AppError("Car is unavailable")
    }

    const user = await this.repository.findByUser(user_id)

    if (user) {
      throw new AppError("There is already a rental for this user")
    }

    // o aluguel deve ter duração mínima de 24h
    console.log('expected_return_date:', expected_return_date)
    const dtRet = dayjs(expected_return_date).utc().local().format()
    console.log('dtRet:', dtRet)
    const hoje = dayjs().utc().local().format()
    console.log('hoje:', dtRet)

    const compare = dayjs(dtRet).diff(hoje, "hours") //converte a diferença em horas

    if (compare < 24) {
      throw new AppError("Invalid return time")
    }

    const rental = await this.repository.create({
      user_id,
      car_id,
      expected_return_date
    })
    
    return rental
  }
}

export { CreateRentalUseCase }