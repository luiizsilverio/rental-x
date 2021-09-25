import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "@modules/cars/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car> 
  findByPlate(plate: string): Promise<Car>
}

export { ICarsRepository }