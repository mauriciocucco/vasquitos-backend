import { getSponsors } from '../repositories/postgre-sponsors.repository.js'

export const findAll = async (req, res, next) => {
  const { query } = req

  try {
    const sponsors = await getSponsors(query)

    res.json(sponsors)
  } catch (error) {
    console.log('findAll sponsors controller error: ', error)

    next(error)
  }
}
