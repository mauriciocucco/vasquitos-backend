import { Router } from 'express'
import { setContact } from '../controllers/contact.controller.js'

export const contact = Router()

contact.post('/', setContact)
