import { DataTypes } from 'sequelize'
import { sequelize } from '../Database/database.js'
import { User } from './user.js'

/**
 * Entidad Order
 * Almacena las órdenes generadas por los usuarios.
 */
export const Order = sequelize.define('order', {
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
    },
    status: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    dni: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    }
})