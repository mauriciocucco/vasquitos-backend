import { getDogs, storeDog } from '../repositories/postgre-dogs.repository.js'
import { cloudinaryUpload } from '../helpers/cloudynary-upload.js'

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

export const store = async (req, res, next) => {
  const { body, file } = req

  try {
    if (file) {
      const imageUploaded = await cloudinaryUpload(file)

      body.image = imageUploaded.secure_url
    }

    const response = await storeDog(body)

    res.status(201).json({ data: response, message: 'Dog stored successfully' })
  } catch (error) {
    console.log('store dogs controller error: ', error)

    next(error)
  }
}
