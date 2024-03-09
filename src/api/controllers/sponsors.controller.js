import { getSponsors } from '../repositories/postgre-sponsors.repository.js'

export const findAll = async (req, res, next) => {
  const { query } = req

  try {
    const { sponsors, total, limit, from } = await getSponsors(query)

    res.json({
      data: sponsors,
      limit,
      from,
      total
    })
  } catch (error) {
    console.log('findAll sponsors controller error: ', error)

    next(error)
  }
}
