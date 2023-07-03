import { Router } from 'express'
import { getProducts } from '../Controllers/productController.js'
import { authUser } from '../Utils/authUser.js'

export const productRouter = Router()

// Ruta para obtener listado de productos
productRouter.get('/products', authUser, getProducts)
