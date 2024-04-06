import { Router } from 'express'
import { setPreference, createPayment, createSubscription } from '../controllers/payments.controller.js'
import { checkPayment } from '../middlewares/check-payment.middleware.js'
// import { checkXSignature } from '../middlewares/check-x-signature.middleware.js'

export const payments = Router()

payments.post('/preference', setPreference)
payments.post('/notifications', /* checkXSignature, */ checkPayment, createPayment)
payments.post('/subscriptions', createSubscription)
