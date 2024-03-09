import { Sponsor } from '../models/postgre-sponsor.model.js'

export const getSponsors = async (queryParams) => {
  const { limit = 10, from = 0 } = queryParams
  const { count: total, rows: sponsors } = await Sponsor.findAndCountAll({
    offset: from,
    limit
  })

  return { sponsors, total, limit, from }
}
