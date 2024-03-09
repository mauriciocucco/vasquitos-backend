import { Router } from 'express'
import { findAll } from '../controllers/sponsors.controller.js'

export const sponsors = Router()

sponsors.get('/', findAll)
