import { Router } from 'express'
import { getCatalogs } from '../Controllers/catalogController.js'

export const catalogRouter = Router()

catalogRouter.get('catalogs', getCatalogs)
