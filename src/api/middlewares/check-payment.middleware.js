/* eslint-disable camelcase */
import { searchPayment } from '../repositories/mercadopago-payments.repository.js'

export const checkPayment = async (req, res, next) => {
  const { body, headers } = req
  const paymentId = body.data.id

  if (!headers['x-signature-id'] !== process.env.SIGNATURE_ID) {
    return res.status(401).json({ message: 'Signature id is not valid' })
  }

  try {
    const { id: mp_id, description, transaction_amount: amount, payment_method, payer } = await searchPayment(paymentId)

    req.body = { mp_id, description, amount, payment_method, payer }

    next()
  } catch (error) {
    console.log('checkPayment middleware error: ', error)

    return res.status(400).json({ message: 'Payment not found' })
  }
}
