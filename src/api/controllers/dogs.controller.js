import { getDogs } from '../repositories/postgre-dogs.repository.js'

export const findAll = async (req, res, next) => {
  const { query } = req

  try {
    const { dogs, total, limit, from } = await getDogs(query)

    res.json({
      data: dogs,
      limit,
      from,
      total
    })
  } catch (error) {
    console.log('findAll dogs controller error: ', error)

    next(error)
  }
}
