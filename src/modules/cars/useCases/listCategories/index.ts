import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const repository = CategoriesRepository.getInstance()

const listCategoryUseCase = new ListCategoriesUseCase(repository)

const listCategoryController = new ListCategoriesController(listCategoryUseCase)

export { listCategoryController }