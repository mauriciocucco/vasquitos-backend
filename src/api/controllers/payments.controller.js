/* eslint-disable camelcase */
import { createPreference, saveDonation } from '../repositories/mercadopago-payments.repository.js'

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

export const createDonation = async (req, res, next) => {
  const { mp_id, description, amount, payment_method, payer } = req.body

  try {
    const donation = await saveDonation({ mp_id, description, amount, payment_method, payer })

    return res.json({ message: 'Donation created successfully', data: donation })
  } catch (error) {
    console.log('createDonation payments controller error: ', error)

    next(error)
  }
}
