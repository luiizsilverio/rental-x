import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@tests/repositories/CarsRepositoryInMemory";


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
  }: IRequest): Promise<void> {

    await this.carsRepository.create({
      name, 
      description, 
      daily_rate, 
      plate, 
      fine_amount, 
      brand, 
      category_id 
    })

  }
}

export { CreateCarUseCase }