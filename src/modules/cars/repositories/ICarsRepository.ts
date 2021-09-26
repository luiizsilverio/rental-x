import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "@modules/cars/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car> 
  findByPlate(plate: string): Promise<Car>
  findById(id: string): Promise<Car>
  findAvailable(
    brand?: string, 
    category_id?: string, 
    name?: string
  ): Promise<Car[]>
}

export { ICarsRepository }