/* eslint-disable camelcase */
import { Preference, Payment } from 'mercadopago'
import { client } from '../../config/mercadopago.config.js'
import { Donation } from '../models/postgre-donation.model.js'
import { Subscription } from '../models/postgre-subscription.model.js'

export const createPreference = async ({ id, title, unit_price }) => {
  const preferenceInstance = new Preference(client)
  const body = {
    items: [
      {
        id,
        title,
        quantity: 1,
        unit_price: parseFloat(unit_price),
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
    },
    notification_url: `${process.env.BACK_BASE_URL}/api/payments/notifications`,
    external_reference: id,
    back_urls: {
      success: `${process.env.FRONT_BASE_URL}`,
      failure: `${process.env.FRONT_BASE_URL}`
    }
  }

  const { init_point } = await preferenceInstance.create({ body })

  return init_point
}

export const searchPayment = async (id) => {
  if (!id) {
    const message = 'Id is required'

    console.log(message)

    return { message }
  }

  const paymentInstance = new Payment(client)

  return await paymentInstance.get({ id })
}

export const searchSubscription = async (id) => {
  if (!id) {
    const message = 'Id is required'

    console.log(message)

    return { message }
  }

  return await fetch(
    `${process.env.MERCADOPAGO_PREAPPROVAL_URL}/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_TOKEN}`
      }
    }
  ).then(async (res) => {
    const response = await res.json()

    if (!res.ok) {
      const error = new Error(response.message)

      error.status = 500

      throw error
    }

    return response
  })
}

export const saveDonation = async (donation) => {
  if (!donation) {
    const error = new Error('Donation is required')

    error.status = 400

    throw error
  }

  const newDonation = await Donation.create(donation)

  console.log('saveDonation donation: ', newDonation)

  return newDonation
}

export const saveSubscription = async (subscription) => {
  if (!subscription) {
    const error = new Error('Subscription is required')

    error.status = 400

    throw error
  }

  const newSubscription = await Subscription.create(subscription)

  console.log('saveSubscription subscription: ', newSubscription)

  return newSubscription
}

export const subscribe = async () => {
  const body = {
    reason: 'Suscripción mensual a Vascos Animalistas VG',
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      transaction_amount: 3000,
      currency_id: 'ARS'
    },
    back_url: process.env.FRONT_BASE_URL
  }

  try {
    const response = await fetch(
      `${process.env.MERCADOPAGO_PREAPPROVAL_URL}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.MERCADOPAGO_TOKEN}`
        },
        body: JSON.stringify(body)
      }
    )

    console.log('subscribe response: ', response)

    if (!response.ok) {
      const parsedResponse = await response.json()

      console.log('subscribe error message: ', parsedResponse)

      const error = new Error(parsedResponse.message || 'Error creating subscription')

      error.status = response.status || 500

      throw error
    }

    const subscription = await response.json()

    console.log('subscription: ', subscription)

    const { id, reason, init_point, auto_recurring, status } = subscription
    const savedSubscription = await saveSubscription({ mp_id: id, reason, init_point, auto_recurring, status })

    return savedSubscription
  } catch (error) {
    console.log('subscribe error: ', error)

    throw error
  }
}
