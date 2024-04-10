import { Router } from 'express'
import { store } from '../controllers/partners.controller.js'

export const partners = Router()

partners.post('/', store)
