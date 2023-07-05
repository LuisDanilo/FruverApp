import { DataTypes } from 'sequelize'
import { sequelize } from '../Database/database.js'
import { Product } from './product.js'
import { ShoppingCart } from './shoppingCart.js'

export const ShoppingCartItem = sequelize.define('shopping_cart_item', {
    shopping_cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: ShoppingCart,
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
    units: {
        type: DataTypes.INTEGER
    }
})