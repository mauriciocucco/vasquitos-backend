import { sendMail } from '../services/contact.service.js'

export const setContact = async (req, res, next) => {
  const { body } = req

  try {
    const response = await sendMail(body)

    console.log('contact controller response: ', response)

    res.json({
      message: 'Email sent successfully!'
    })
  } catch (error) {
    console.log('contact controller error: ', error)

    next(error)
  }
}
