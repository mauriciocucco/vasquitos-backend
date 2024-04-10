import { Router } from 'express'
import { createSubscription } from '../controllers/payments.controller.js'

export const subscriptions = Router()

subscriptions.post('/', createSubscription)
