import { DataTypes } from 'sequelize'
import { sequelize } from '../Database/database.js'
import { User } from './user.js'

/**
 * Entidad ShoppingCart
 * Almacena los carritos de compra de los usuarios.
 */
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