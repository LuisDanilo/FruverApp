import { DataTypes } from 'sequelize'
import { sequelize } from '../Database/database.js'

/**
 * Entidad Role
 * Almacena los roles de los usuarios.
 * Cada rol otorga autorización a los usuarios para diferentes acciones
 */
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
