import { getDogs } from '../services/dogs.service.js'

export const findAll = async (req, res) => {
  const { query } = req
  const { dogs, total, limit, from } = await getDogs(query)

  res.json({
    data: dogs,
    limit,
    from,
    total
  })
}
