import { Specification } from "@modules/cars/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {

  specifications: Specification[] = []

  async create({ name, description }: { name: any; description: any; }): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, {
      description,
      name
    })

    this.specifications.push(specification)

    return specification
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(specification => specification.name === name)
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const all = this.specifications.filter(specification => 
      ids.includes(specification.id)
    )

    return all
  }  
}

export { SpecificationRepositoryInMemory }