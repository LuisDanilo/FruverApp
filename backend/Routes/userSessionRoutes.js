import { Router } from 'express'
import { performLogin } from '../Controllers/userSessionController.js'

export const userSessionRouter = Router()

userSessionRouter.post('/login', performLogin)