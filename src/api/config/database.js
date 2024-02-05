import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: process.env.DB_SSL === 'true',
      rejectUnauthorized: false
    }
  }
})
