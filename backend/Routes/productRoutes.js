import { Router } from 'express'
import { getProducts } from '../Controllers/productController.js'
import { authUser } from '../Utils/authUser.js'

export const productRouter = Router()

productRouter.get('/products', authUser, getProducts)
