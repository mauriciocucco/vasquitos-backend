import { dogs } from './dogs.route.js'
import { payments } from './payments.route.js'
// import { sponsors } from './sponsors'

const PATHS = {
  dogs: '/api/dogs',
  payments: '/api/payments',
  sponsors: '/api/sponsors'
}

export const routes = (app) => {
  app.use(PATHS.dogs, dogs)
  app.use(PATHS.payments, payments)
  // app.use(PATHS.sponsors, sponsors)
}
