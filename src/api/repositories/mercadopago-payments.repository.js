/* eslint-disable camelcase */
import { Preference, Payment } from 'mercadopago'
import { client } from '../../config/mercadopago.config.js'
import { Donation } from '../models/postgre-donation.model.js'

export const createPreference = async ({ id, title, unit_price }) => {
  const preferenceInstance = new Preference(client)
  const body = {
    items: [
      {
        id,
        title,
        quantity: 1,
        unit_price,
        currency_id: 'ARS'
      }
    ],
    payment_methods: {
      excluded_payment_types: [
        {
          id: 'ticket'
        }
      ],
      installments: 1,
      default_installments: 1
    }
  }

  const { sandbox_init_point } = await preferenceInstance.create({ body })

  return sandbox_init_point
}

export const searchPayment = async (id) => {
  if (!id) throw new Error('Id is required')

  const paymentInstance = new Payment(client)

  return await paymentInstance.get({ id })
}

export const saveDonation = async (donation) => {
  if (!donation) throw new Error('Donation is required')

  console.log('saveDonation donation: ', donation)

  return await Donation.create(donation)
}
