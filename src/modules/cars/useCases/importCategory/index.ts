import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const repository = CategoriesRepository.getInstance()

const importCategoryUseCase = new ImportCategoryUseCase(repository)

const importCategoryController = new ImportCategoryController(importCategoryUseCase)

export { importCategoryController }
