import { Sponsor } from '../models/postgre-sponsor.model.js'

export const getSponsors = async () => {
  const { rows } = await Sponsor.findAndCountAll()

  return rows
}
