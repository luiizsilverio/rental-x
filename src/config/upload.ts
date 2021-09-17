import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const hash = crypto.randomBytes(8).toString('hex')
          const fileName = `${hash}-${file.originalname}`
          return callback(null, fileName)
        }
      })
    }
  }
}

// o nome original do arquivo do cliente vem no parâmetro file.
// se der erro, callback passa o erro no primeiro parâmetro