import { Router } from 'express'
import { addShoppingCartItem, getShoppingCartItems } from '../Controllers/shoppingCartController.js'
import { authUser } from '../Utils/authUser.js'

export const shoppingCartRouter = Router()

shoppingCartRouter.post('/cart', authUser, addShoppingCartItem)
shoppingCartRouter.get('/cart/items', authUser, getShoppingCartItems)
