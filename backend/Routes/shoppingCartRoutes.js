import { Router } from 'express'
import { getUsers } from '../Controllers/userController.js'

export const shoppingCartRouter = Router()

shoppingCartRouter.get('cart/:id/', getUsers)
