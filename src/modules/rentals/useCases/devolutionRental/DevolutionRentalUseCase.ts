import { inject, injectable } from "tsyringe";
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { AppError } from "@errors/AppError";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/entities/Rental";

dayjs.extend(utc)

interface IRequest {
  id: string
  user_id: string
}

@injectable()
class DevolutionRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id)

    const car = await this.carsRepository.findById(rental.car_id)

    if (!rental) {
      throw new AppError("Rental does not exist")
    }

    // o aluguel deve ter duração mínima de 24h
    const dtIni = dayjs(rental.start_date).utc().local().format()
    const hoje = dayjs().utc().local().format()

    let ndias = dayjs(dtIni).diff(hoje, "days") //converte a diferença em dias

    if (ndias <= 0) {
      ndias = 1
    }

    const dtRet = dayjs(rental.expected_return_date).utc().local().format()

    let delay = dayjs(dtRet).diff(hoje, "days") //converte a diferença em dias
    
    let total = 0

    if (delay > 0) {
      const multa = delay * car.fine_amount
      total = multa
    }

    total += car.daily_rate * ndias

    rental.end_date = dayjs().toDate()
    rental.total = total

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(rental.car_id, true)

    return rental
  }
}

export { DevolutionRentalUseCase }