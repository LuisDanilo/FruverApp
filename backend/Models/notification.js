import { DataTypes } from "sequelize";
import { sequelize } from "../Database/database.js";
import { User } from "./user.js";

/**
 * Entidad Notification
 * Almancena las notificaciones de los usuarios.
 */
export const Notification = sequelize.define('notification', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    text: {
        type: DataTypes.STRING
    }
})