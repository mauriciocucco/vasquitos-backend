import { Partner } from '../models/postgre-partner-model.js'

export const storePartner = async (partner) => {
  const response = await Partner.create(partner)

  return response
}
