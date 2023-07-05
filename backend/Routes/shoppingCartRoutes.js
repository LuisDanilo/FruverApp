import { Router } from 'express'
import { addShoppingCartItem, getShoppingCartItems } from '../Controllers/shoppingCartController.js'
import { authUser } from '../Utils/authUser.js'

export const shoppingCartRouter = Router()

// Ruta para agregar un producto al carrito
shoppingCartRouter.post('/cart', authUser, addShoppingCartItem)

// Ruta para obtener el listado de produtos del carrito
shoppingCartRouter.get('/cart/items', authUser, getShoppingCartItems)
