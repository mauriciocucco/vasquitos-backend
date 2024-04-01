/* eslint-disable camelcase */
import { searchPayment, searchSubscription } from '../repositories/mercadopago-payments.repository.js'

export const checkPayment = async (req, res, next) => {
  const { body/*, headers */ } = req

  console.log('checkPayment middleware body: ', body)

  const paymentId = body.data?.id

  if (!paymentId) return res.status(201).json({ message: 'Payment ID is missing' })

  // if (!headers['x-signature'] !== process.env.SIGNATURE_ID) {
  //   return res.status(401).json({ message: 'Signature id is not valid' })
  // }

  try {
    if (body.type === 'subscription_preapproval') {
      if (body.action !== 'updated') {
        return res.status(201).json({ message: 'Subscription created successfully' })
      }

      const subscription = await searchSubscription(paymentId)

      console.log('checkPayment middleware subscription: ', subscription)

      if (subscription.status === 'pending') return res.status(201).json({ message: 'Subscription updated successfully' })

      const { id, payer_email, status, auto_recurring, payment_method_id } = subscription

      req.body = { mp_id: id, payer_email, status, auto_recurring, payment_method_id, type: 'subscription' }
    } else {
      const payment = await searchPayment(paymentId)
      const { id: mp_id, description, transaction_amount: total_amount, transaction_details: { net_received_amount }, payment_method, payer, status, status_detail, fee_details, charges_details } = payment

      console.log('checkPayment middleware payment: ', payment)

      req.body = { mp_id, description, total_amount, net_amount: net_received_amount, payment_method, payer, fee_details, charges_details, status, status_detail }
    }

    next()
  } catch (error) {
    console.log('checkPayment middleware error: ', error)

    if (error.status) return res.status(error.status).json({ message: error.message })

    throw error
  }
}
