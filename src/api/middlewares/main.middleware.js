import { json, urlencoded } from 'express'

import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
})

export const mainMiddlewares = (app) => {
  // CORS
  app.use(cors())

  // Helmet
  app.use(helmet())

  // Limiter - Apply the rate limiting middleware to all requests
  app.use(limiter)

  // Morgan logger
  app.use(morgan('tiny'))

  // Body parser de Express
  app.use(json()) // parsea application/json
  app.use(urlencoded({ extended: false })) // parsea application/x-www-form-urlencoded

  app.set('trust proxy', 1) // trust first proxy
}
