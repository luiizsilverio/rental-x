import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const repository = null // new CategoriesRepository()

const importCategoryUseCase = new ImportCategoryUseCase(repository)

const importCategoryController = new ImportCategoryController(importCategoryUseCase)

export { importCategoryController }
