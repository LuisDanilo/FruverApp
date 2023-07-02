import { Router } from 'express'
import { getRoles } from '../Controllers/roleController.js'

export const roleRouter = Router()

roleRouter.get('roles', getRoles)
