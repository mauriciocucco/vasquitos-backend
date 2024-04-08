/* eslint-disable camelcase */
import { searchPayment, searchSubscription } from '../repositories/mercadopago-payments.repository.js'

export const checkPayment = async (req, res, next) => {
  const { body } = req

  console.log('checkPayment middleware body: ', body)

  if (body.type && !body.action) return res.json({ message: 'Notification without action. Action is required for further processing.' })

  const paymentId = body.data?.id

  try {
    if (body.type === 'subscription_preapproval') {
      if (body.action !== 'updated') {
        return res.status(201).json({ message: 'Subscription created successfully' })
      }

      const subscription = await searchSubscription(paymentId)

      if (subscription.message === 'Id is required') return res.json({ message: subscription.message })

      console.log('checkPayment middleware subscription: ', subscription)

      if (subscription.status === 'pending') return res.status(201).json({ message: 'Subscription updated successfully' })

      const { id, payer_email, status, auto_recurring, payment_method_id } = subscription

      req.body = { mp_id: id, payer_email, status, auto_recurring, payment_method_id, type: 'subscription' }
    } else {
      const payment = await searchPayment(paymentId)

      if (payment.message === 'Id is required') return res.json({ message: payment.message })

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
