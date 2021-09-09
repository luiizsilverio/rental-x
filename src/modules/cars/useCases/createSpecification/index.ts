import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository"
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const repository = new SpecificationsRepository()

const createSpecificationUseCase = new CreateSpecificationUseCase(repository)

const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export { createSpecificationController }