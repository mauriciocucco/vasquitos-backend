import { storePartner } from '../repositories/postgre-partners.repository.js'

export const store = async (req, res, next) => {
  const { body } = req

  try {
    const response = await storePartner(body)

    res.status(201).json({ data: response, message: 'Partner stored successfully' })
  } catch (error) {
    console.log('store partner controller error: ', error)

    next(error)
  }
}
