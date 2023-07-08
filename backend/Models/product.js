import { DataTypes } from 'sequelize'
import { sequelize } from '../Database/database.js'

/**
 * Entidad Product
 * Almacena los productos disponibles en la tienda.
 */
export const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    detail: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    available_units: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING
    }
})