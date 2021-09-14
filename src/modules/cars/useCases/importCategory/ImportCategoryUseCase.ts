import fs from "fs"
import csvParse from 'csv-parse'
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"
import { inject, injectable } from "tsyringe"

interface IImportCategory {
  name: string
  description: string
}

@injectable()
class ImportCategoryUseCase {
  
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) {
  }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = []

      // opções opcionais, pois o delimitador padrão já é vírgula
      const parseFile = csvParse({ delimiter: "," }) 
      
      const stream = fs.createReadStream(file.path)
      stream.pipe(parseFile)

      parseFile.on("data", async (line) => {
        const [name, description] = line      
        categories.push({ 
          name, 
          description 
        })
      })
      .on("end", () => {
        fs.promises.unlink(file.path)
        resolve(categories)
      })
      .on("error", (err) => {
        reject(err)
      })
    })
  }
  
  async execute(csv: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(csv)

    categories.map(async (category) => {
      const { name, description } = category

      const existe = await this.categoriesRepository.findByName(name)

      if (!existe) {
        await this.categoriesRepository.create({
          name,
          description
        })
      }
    })
  }
}

export { ImportCategoryUseCase }