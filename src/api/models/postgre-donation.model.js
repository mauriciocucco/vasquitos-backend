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
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  net_amount: {
    type: DataTypes.DECIMAL(10, 2),
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
  fee_details: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  charges_details: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status_detail: {
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
}, { timestamps: false, tableName: 'donations' })
