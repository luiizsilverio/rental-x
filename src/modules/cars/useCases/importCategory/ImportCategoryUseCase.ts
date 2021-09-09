import fs from "fs"
import csvParse from 'csv-parse'
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository"

interface IImportCategory {
  name: string
  description: string
}

class ImportCategoryUseCase {
  private repository: CategoriesRepository

  constructor(categoriesRepository: CategoriesRepository) {
    this.repository = categoriesRepository
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

    categories.map(category => {
      const { name, description } = category

      const existe = this.repository.findByName(name)

      if (!existe) {
        this.repository.create({
          name,
          description
        })
      }
    })
  }
}

export { ImportCategoryUseCase }