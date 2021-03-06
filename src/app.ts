import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import swaggerConfig from './swagger.json'
import { AppError } from './errors/AppError'
import './database'
import './shared/container'
import { router } from './routes'


const app = express()

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.use(router)

// Middleware de tratamento de erro
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			message: err.message
		})
	}

	return response.status(500).json({
		status: "error",
		message: `Internal server error - ${err.message}`
	})
})

export { app }

// app.listen(3333, () => {
// 	console.log('Rodando na porta 3333')
// })
