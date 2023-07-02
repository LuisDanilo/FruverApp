import { DataTypes } from 'sequelize'
import { sequelize } from '../Database/database.js'
import { User } from './user.js'

export const ShoppingCart = sequelize.define('shopping_cart', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    total: {
        type: DataTypes.INTEGER
    }
})