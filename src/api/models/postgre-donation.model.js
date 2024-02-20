import { DataTypes } from 'sequelize'

import { connection } from '../../config/postgre-database.config.js'

export const Donation = connection.define('Donation', {
  mp_id: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  payment_method: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  payer: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deleted_at: {
    type: DataTypes.DATE
  }
}, { timestamps: false, tableName: 'donations' })
