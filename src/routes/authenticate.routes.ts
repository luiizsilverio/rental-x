import { Router } from 'express'

import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController'
import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController'

const authRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

authRoutes.post("/sessions", authenticateUserController.handle)
authRoutes.post("/refresh-token", refreshTokenController.handle)

export { authRoutes }