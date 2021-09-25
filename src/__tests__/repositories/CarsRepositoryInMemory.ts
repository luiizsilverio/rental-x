import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []
  
  async create({
    name, 
    description, 
    daily_rate, 
    plate,
    fine_amount, 
    brand, 
    category_id
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name, 
      description, 
      daily_rate, 
      plate,
      fine_amount, 
      brand, 
      category_id
    })

    this.cars.push(car)

    return car
  }
  
  async findByPlate(plate: string): Promise<Car> {
    return this.cars.find(car => car.plate === plate)
  }
}

export { CarsRepositoryInMemory }