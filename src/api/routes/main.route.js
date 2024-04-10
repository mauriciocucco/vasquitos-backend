import { dogs } from './dogs.route.js'
import { payments } from './payments.route.js'
import { sponsors } from './sponsors.route.js'
import { members } from './members.route.js'
import { contact } from './contact.route.js'
import { partners } from './partners.route.js'
import { subscriptions } from './subscriptions.route.js'

const PATHS = {
  dogs: '/api/dogs',
  payments: '/api/payments',
  sponsors: '/api/sponsors',
  members: '/api/members',
  contact: '/api/contact',
  partners: '/api/partners',
  subscriptions: '/api/subscriptions'
}

export const routes = (app) => {
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Dog Shelter API' })
  })
  app.use(PATHS.dogs, dogs)
  app.use(PATHS.payments, payments)
  app.use(PATHS.sponsors, sponsors)
  app.use(PATHS.members, members)
  app.use(PATHS.contact, contact)
  app.use(PATHS.partners, partners)
  app.use(PATHS.subscriptions, subscriptions)
}
