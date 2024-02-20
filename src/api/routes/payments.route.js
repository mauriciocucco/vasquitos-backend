import { Router } from 'express'
import { setPreference, createDonation } from '../controllers/payments.controller.js'
import { checkPayment } from '../middlewares/check-payment.middleware.js'

export const payments = Router()

payments.post('/preference', setPreference)
payments.post('/donations', checkPayment, createDonation)
