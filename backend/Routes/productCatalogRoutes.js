import { Router } from 'express'
import { getCatalogProducts } from '../Controllers/productCatalogController.js'

export const productCatalogRouter = Router()

productCatalogRouter.get('catalog/:id/products', getCatalogProducts)
