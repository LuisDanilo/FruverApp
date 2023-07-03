import { Router } from 'express'
import { performLogin, performLogout } from '../Controllers/userSessionController.js'
import { authUser } from '../Utils/authUser.js'

export const userSessionRouter = Router()

// Ruta para hacer login
userSessionRouter.post('/login', performLogin)
userSessionRouter.get('/logout', authUser, performLogout)