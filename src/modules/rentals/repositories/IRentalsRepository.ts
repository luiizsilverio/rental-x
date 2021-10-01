import { Rental } from "@modules/rentals/entities/Rental";
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";

interface IRentalsRepository {
  findByCar(car_id: string): Promise<Rental>
  findByUser(user_id: string): Promise<Rental>
  findById(id: string): Promise<Rental>
  create(data: ICreateRentalDTO): Promise<Rental>
}

export { IRentalsRepository }