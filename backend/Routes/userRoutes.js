import { Router } from 'express'
import { getUsers } from '../Controllers/userController.js'

export const userRouter = Router()

userRouter.get('users', getUsers)

