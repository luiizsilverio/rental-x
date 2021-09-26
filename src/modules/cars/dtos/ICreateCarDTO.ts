import { Specification } from "../entities/Specification";

interface ICreateCarDTO {
  name: string
  description: string
  daily_rate: number
  plate: string
  fine_amount: number
  brand: string
  category_id: string
  specifications?: Specification[]
}

export { ICreateCarDTO }