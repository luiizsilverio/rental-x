import { Specification } from "../entities/Specification";

interface ICreateSpecification {
  name: string
  description: string
}

interface ISpecificationsRepository {
  create({ name, description}: ICreateSpecification): void
  findByName(name: string): Specification
}

export { ICreateSpecification, ISpecificationsRepository }