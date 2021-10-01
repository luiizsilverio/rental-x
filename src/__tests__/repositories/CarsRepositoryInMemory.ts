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
    category_id,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name, 
      description, 
      daily_rate, 
      plate,
      fine_amount, 
      brand, 
      category_id,
      id
    })

    this.cars.push(car)

    return car
  }
  
  async findByPlate(plate: string): Promise<Car> {
    return this.cars.find(car => car.plate === plate)
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id)
  }
  
  async findAvailable(
    brand?: string, 
    category_id?: string, 
    name?: string
  ): Promise<Car[]> {

    const cars = this.cars.filter(car => car.available)
      .filter(car => !brand || car.brand === brand)
      .filter(car => !category_id || car.category_id === category_id)
      .filter(car => !name || car.name === name)

    return cars 
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex(car => car.id === id)

    if (carIndex >= 0) {
      this.cars[carIndex].available = available
    }
  }
}

export { CarsRepositoryInMemory }