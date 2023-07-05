import { DataTypes } from 'sequelize'
import { sequelize } from '../Database/database.js'
import { Order } from './order.js'
import { Product } from './product.js'

export const OrderItem = sequelize.define('order_item', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Order,
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Product,
            key: 'id'
        }
    },
    adquired_units: {
        type: DataTypes.INTEGER
    }
})