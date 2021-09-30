import { Rental } from "@modules/rentals/entities/Rental";
import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "./IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ car_id })
    return rental
  }
  
  async findByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ user_id })
    return rental
  }
  
  async create({ 
    car_id, 
    expected_return_date, 
    user_id 
  }: ICreateRentalDTO): Promise<Rental> {

    const rental = this.repository.create({
      car_id, 
      expected_return_date, 
      user_id 
    })

    await this.repository.save(rental)
    return rental
  }

}

export { RentalsRepository }