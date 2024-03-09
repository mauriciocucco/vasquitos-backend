import { getMembers } from '../repositories/postgre-members.repository.js'

export const findAll = async (req, res, next) => {
  const { query } = req

  try {
    const { members, total, limit, from } = await getMembers(query)

    res.json({
      data: members,
      limit,
      from,
      total
    })
  } catch (error) {
    console.log('findAll members controller error: ', error)

    next(error)
  }
}
