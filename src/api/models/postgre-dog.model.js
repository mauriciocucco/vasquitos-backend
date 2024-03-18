import { DataTypes } from 'sequelize'

import { connection } from '../../config/postgre-database.config.js'

export const Status = connection.define('Status', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 2
  }
}, { timestamps: false, tableName: 'status' })

export const Dog = connection.define('Dog', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    set (value) {
      this.setDataValue('age', value === '' ? null : value)
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sex: {
    type: DataTypes.ENUM,
    values: ['male', 'female'],
    allowNull: false
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    set (value) {
      this.setDataValue('status_id', value === '' ? 2 : value)
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    set (value) {
      this.setDataValue('image', value === '' ? null : value)
    }
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
}, { timestamps: false, tableName: 'dogs' })

Dog.belongsTo(Status, { foreignKey: 'status_id' })
Status.hasMany(Dog, { foreignKey: 'status_id' })
