import { Router } from 'express'
import { store } from '../controllers/partners.controller.js'

export const members = Router()

members.post('/', store)
