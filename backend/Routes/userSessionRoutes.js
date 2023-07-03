import { Router } from 'express'
import { performLogin } from '../Controllers/userSessionController.js'

export const userSessionRouter = Router()

// Ruta para hacer login
userSessionRouter.post('/login', performLogin)