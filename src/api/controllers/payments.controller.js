/* eslint-disable camelcase */
import { createPreference, saveDonation, subscribe, saveSubscription } from '../repositories/mercadopago-payments.repository.js'

export const setPreference = async (req, res, next) => {
  const { body } = req

  try {
    const result = await createPreference(body)

    return res.json(result)
  } catch (error) {
    console.log('createPreference payments controller error: ', error)

    next(error)
  }
}

export const createPayment = async (req, res, next) => {
  try {
    if (req.body?.type === 'subscription') {
      const { mp_id, payer_email, status, auto_recurring, payment_method_id } = req.body
      const subscription = await saveSubscription({ mp_id, payer_email, status, auto_recurring, payment_method_id })

      return res.status(201).json({ message: 'Subscription created successfully', data: subscription })
    } else {
      const { mp_id, description, amount, payment_method, payer, status, status_detail } = req.body
      const donation = await saveDonation({ mp_id, description, amount, payment_method, payer, status, status_detail })

      return res.status(201).json({ message: 'Donation created successfully', data: donation })
    }
  } catch (error) {
    console.log('createPayment controller error: ', error)

    next(error)
  }
}

export const createSubscription = async (req, res, next) => {
  const { payer_email } = req.body

  try {
    const subscription = await subscribe(payer_email)

    console.log('createSubscription subscription: ', subscription)

    return res.status(201).json({ message: 'Subscription created successfully', url: subscription.init_point })
  } catch (error) {
    console.log('createSubscription payments controller error: ', error)

    if (error.status) return res.status(error.status).json({ message: error.message })

    next(error)
  }
}
