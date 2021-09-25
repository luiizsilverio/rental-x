import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/entities/Car";

interface IRequest {
  name: string
  description: string
  daily_rate: number
  plate: string
  fine_amount: number
  brand: string
  category_id: string
}

@injectable()
class CreateCarUseCase {

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ){}

  async execute({ 
    name, 
    description, 
    daily_rate, 
    plate, 
    fine_amount, 
    brand, 
    category_id 
  }: IRequest): Promise<Car> {

    const carExists = await this.carsRepository.findByPlate(plate)

    if (carExists) {
      throw new AppError("Car already exists")
    }
    
    const car = await this.carsRepository.create({
      name, 
      description, 
      daily_rate, 
      plate, 
      fine_amount, 
      brand, 
      category_id 
    })

    return car
  }
}

export { CreateCarUseCase }