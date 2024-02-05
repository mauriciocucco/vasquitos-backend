import express from 'express'
import dotenv from 'dotenv'

import { mainMiddlewares } from './middlewares/main.middleware.js'
import { routes } from './routes/main.route.js'
import { errorMiddlewares } from './middlewares/errors.middleware.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

mainMiddlewares(app)

routes(app)

errorMiddlewares(app)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})
