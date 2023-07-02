import { Router } from 'express'
import { getOrderItems } from '../Controllers/orderItemsController.js'

export const orderItemRouter = Router()

orderItemRouter.get('order/:id/items', getOrderItems)
