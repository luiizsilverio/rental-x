import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const repository = CategoriesRepository.getInstance()

const createCategoryUseCase = new CreateCategoryUseCase(repository)

const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export { createCategoryController }