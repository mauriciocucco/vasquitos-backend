import { DataTypes } from 'sequelize'

import { connection } from '../../config/postgre-database.config.js'

export const Status = connection.define('Status', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: false, tableName: 'status' })

export const Dog = connection.define('Dog', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  sex: {
    type: DataTypes.ENUM,
    values: ['male', 'female'],
    allowNull: false
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
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
}, { timestamps: false, tableName: 'dogs' })

Dog.belongsTo(Status, { foreignKey: 'status_id' })
Status.hasMany(Dog, { foreignKey: 'status_id' })
