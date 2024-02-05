import { Router } from 'express'
import { findAll } from '../controllers/dogs.controller.js'

export const dogs = Router()

dogs.get('/', findAll)
