import { Member } from '../models/postgre-member.model.js'

export const getMembers = async (queryParams) => {
  const { limit = 10, from = 0 } = queryParams
  const { count: total, rows: members } = await Member.findAndCountAll({
    offset: from,
    limit
  })

  return { members, total, limit, from }
}
