import { Router } from 'express'
import { findAll } from '../controllers/members.controller.js'

export const members = Router()

members.get('/', findAll)
