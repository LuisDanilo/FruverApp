import { Notification } from "../Models/notification.js"

/**
 * Función para obtener las notificaiones de un usuario.
 * Retorna un listado de notificaciones
 */
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: { user_id: req.user.id }
        })
        res.status(200).json(notifications)
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: `${err}` })
    }
}

/**
 * Función que borra una notificación.
 */
export const deleteNotification = async (req, res) => {
    try {
        await Notification.destroy({
            where: { id: req.query.notificationId }
        })
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: `${err}` })
    }
}
