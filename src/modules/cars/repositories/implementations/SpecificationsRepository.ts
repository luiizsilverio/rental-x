import { Specification } from "../../model/Specification";
import { ICreateSpecification, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]

  constructor() {
    this.specifications = []
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(spec => spec.name === name)

    return specification
  }

  create({ name, description }: ICreateSpecification): void {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description
    })
    
    this.specifications.push(specification)    
  }
}

export { SpecificationsRepository }