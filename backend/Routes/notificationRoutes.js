import { Router } from "express";
import { authUser } from "../Utils/authUser.js";
import { getNotifications, deleteNotification } from "../Controllers/notificationController.js";

export const notificationRouter = Router()

// Ruta para obtener notificaciones
notificationRouter.get('/notifications', authUser, getNotifications)

// Ruta para descartar notificaciones
notificationRouter.delete('/notification', authUser, deleteNotification)