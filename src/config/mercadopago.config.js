import { MercadoPagoConfig } from 'mercadopago'
import 'dotenv/config'

export const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_TOKEN })
