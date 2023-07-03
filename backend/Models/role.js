import { DataTypes } from 'sequelize'
import { sequelize } from '../Database/database.js'

export const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    policy: {
        type: DataTypes.JSON
    }
})
