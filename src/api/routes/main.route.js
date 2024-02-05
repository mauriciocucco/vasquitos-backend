import { dogs } from './dogs.route.js'
// import { sponsors } from './sponsors'

const PATHS = {
  dogs: '/api/dogs',
  sponsors: '/api/sponsors'
}

export const routes = (app) => {
  app.use(PATHS.dogs, dogs)
  // app.use(PATHS.sponsors, sponsors)
}
