/* eslint-disable camelcase */
import { searchPayment } from '../repositories/mercadopago-payments.repository.js'

export const checkPayment = async (req, res, next) => {
  const { body, query } = req

  console.log('checkPayment middleware body and query: ', body, query)

  if (!body.action) {
    const message = 'Notification without action. Action is required for further processing.'

    console.log(message)

    return res.json({ message })
  }

  const paymentId = body.data?.id

  try {
    if (body.type !== 'payment') {
      return res.json({ message: 'Notification is not a payment' })
    } else {
      const payment = await searchPayment(paymentId)

      if (payment.message === 'Id is required') return res.json({ message: payment.message })

      const { id: mp_id, description, transaction_amount: total_amount, transaction_details: { net_received_amount }, payment_method, payer, status, status_detail, fee_details, charges_details, card } = payment

      console.log('checkPayment middleware payment: ', payment)

      req.body = { mp_id, description, total_amount, net_amount: net_received_amount, payment_method, payer, fee_details, charges_details, status, status_detail, card }
    }

    next()
  } catch (error) {
    console.log('checkPayment middleware error: ', error)

    if (error.status) return res.status(error.status).json({ message: error.message })

    throw error
  }
}
