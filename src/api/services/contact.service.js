import transporter from '../../config/nodemailer.config.js'

export const sendMail = async (body) => {
  const { fullName, email, contactMessage } = body

  const info = await transporter.sendMail({
    from: `${fullName} <${email}>`,
    to: `${process.env.MAIL_USER}`,
    subject: 'Nuevo mensaje desde la sección de Contacto ✔', // Subject line
    text: `${contactMessage}`, // plain text body
    html: `
        <h1>¡Recibiste un mensaje desde Contacto!</h1>
        <p>Nombre y Apellido: ${fullName}</p>
        <p>Email: ${email}</p>
        <p>Mensaje: ${contactMessage}</p>
    ` // html body
  })

  return info
}
