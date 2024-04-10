import { DataTypes } from 'sequelize'

import { connection } from '../../config/postgre-database.config.js'

export const Subscription = connection.define('Subscription', {
  mp_id: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  },
  init_point: {
    type: DataTypes.STRING,
    allowNull: false
  },
  auto_recurring: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
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
