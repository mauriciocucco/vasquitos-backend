/* eslint-disable camelcase */
import { createPreference, saveDonation, subscribe } from '../repositories/mercadopago-payments.repository.js'

export const setPreference = async (req, res, next) => {
  const { body } = req

  try {
    const result = await createPreference(body)

    return res.status(201).json(result)
  } catch (error) {
    console.log('createPreference payments controller error: ', error)

    next(error)
  }
}

export const createPayment = async (req, res, next) => {
  try {
    const donation = await saveDonation(req.body)

    return res.status(201).json({ message: 'Donation created successfully', data: donation })
  } catch (error) {
    console.log('createPayment controller error: ', error)

    next(error)
  }
}

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await subscribe()

    return res.status(201).json({ message: 'Subscription created successfully', url: subscription.init_point })
  } catch (error) {
    next(error)
  }
}
