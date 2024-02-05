import { Dog } from '../models/Dog.model.js'

export const getDogs = async (queryParams) => {
  const { limit = 10, from = 0 } = queryParams

  const { count: total, rows: dogs } = await Dog.findAndCountAll({
    offset: from,
    limit
  })

  return { dogs, total, limit, from }
}