import { Specification } from "../entities/Specification";

export interface ISpecificationsRepository {
  create({ name, description }): Promise<void>
  findByName(name: string): Promise<Specification>
  findByIds(ids: string[]): Promise<Specification[]>
}
