import { DataTypes } from 'sequelize'
import { sequelize } from '../Database/database.js'

export const Catalog = sequelize.define('catalog', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
})