import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/entities/Car";
import { getRepository, Repository } from "typeorm";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    plate
  }: ICreateCarDTO): Promise<Car> {
    
    const car = this.repository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      plate
    })

    await this.repository.save(car)

    return car
  }

  async findByPlate(plate: string): Promise<Car> {
    const car = await this.repository.findOne({ plate })

    return car
  }
}

export { CarsRepository }