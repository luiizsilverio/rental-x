import { Specification } from "../entities/Specification";

interface ICreateSpecification {
  name: string
  description: string
}

interface ISpecificationsRepository {
  create({ name, description}: ICreateSpecification): Promise<void>
  findByName(name: string): Promise<Specification>
}

export { ICreateSpecification, ISpecificationsRepository }