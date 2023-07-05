import { Router } from 'express'
import { getOrders, getOrderItems } from '../Controllers/orderController.js'
import { authUser } from '../Utils/authUser.js'

export const orderRouter = Router()

// Ruta para obtener todas las órdenes
orderRouter.get('/orders', authUser, getOrders)

// Ruta para obtener todos los productos de una orden
orderRouter.get('/order/items', authUser, getOrderItems)