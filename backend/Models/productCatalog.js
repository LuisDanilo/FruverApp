import { DataTypes } from 'sequelize'
import { sequelize } from '../Database/database.js'
import { Product } from './product.js'
import { Catalog } from './catalog.js'

export const ProductCatalog = sequelize.define('product_catalog', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Product,
            key: 'id'
        }
    },
    catalog_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Catalog,
            key: 'id'
        }
    }
})