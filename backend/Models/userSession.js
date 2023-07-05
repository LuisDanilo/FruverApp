import { DataTypes } from 'sequelize'
import { sequelize } from '../Database/database.js'
import { User } from './user.js'

/**
 * Entidad UserSession
 * Almancena las sesiones de los usuarios.
 */
export const UserSession = sequelize.define('user_session', {
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
    status: {
        type: DataTypes.STRING
    }
})