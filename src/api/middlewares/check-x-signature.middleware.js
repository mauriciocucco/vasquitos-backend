import crypto from 'crypto'

export const checkXSignature = (req, res, next) => {
  const { headers } = req
  const XSignature = headers['x-signature']

  if (!XSignature) return res.status(400).json({ message: 'X-Signature header is required for further processing' })

  //   const [timestamp, signature] = XSignature.split(',')
  //   const signatureParsed =
  //   const cyphedSignature = crypto
  //     .createHmac('sha256', process.env.SIGNATURE_ID)
  //     .update(signatureParsed)
  //     .digest('hex')

  next()
}
