import express from 'express'

import { mainMiddlewares } from './middlewares/main.middleware.js'
import { routes } from './routes/main.route.js'
import { errorsMiddlewares } from './middlewares/errors.middleware.js'

const app = express()
const PORT = process.env.PORT ?? 3000

mainMiddlewares(app)

routes(app)

errorsMiddlewares(app)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})

export default app
