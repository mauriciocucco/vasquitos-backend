import cloudinary from '../../config/cloudinary.config.js'

export const cloudinaryUpload = async (file) => {
  const b64 = Buffer.from(file.buffer).toString('base64')
  const dataURI = 'data:' + file.mimetype + ';base64,' + b64

  try {
    const response = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto'
    })

    return response
  } catch (error) {
    console.log('cloudinaryUpload error: ', error)

    throw new Error('Error uploading image to Cloudinary')
  }
}
