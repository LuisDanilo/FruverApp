import { Router } from 'express'
import { getOrders } from '../Controllers/orderController.js'

export const orderRouter = Router()

orderRouter.get('orders', getOrders)
