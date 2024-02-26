import { DataTypes } from 'sequelize'

import { connection } from '../../config/postgre-database.config.js'

export const Subscription = connection.define('Subscription', {
  mp_id: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  payer_email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  auto_recurring: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  payment_method_id: {
    type: DataTypes.STRING,
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
}, { timestamps: false, tableName: 'subscriptions' })
