import { UserSession } from "../Models/userSession.js"
import { User } from "../Models/user.js"


/**
 * Función que realiza login a un usuario.
 * Retorna al usuario algunos de sus datos y el sessionId si el login fue exitoso, error en caso contrario.
 */
export const performLogin = async (req, res) => {
    try {
        // Recuperar credenciales
        const { username, password } = req.body
        // Buscar usuario con las credenciales anteriores
        const user = await User.findOne({
            where: { username, password }
        })
        if (!user) {
            // Usuario no encontrado
            throw new Error('User not found using given credentials')
        }
        // Usuario encontrado, crear una nueva sesión
        const newSession = await UserSession.create({
            user_id: user.id, status: 'ACTIVE'
        })
        // Información del usuario como respuesta
        res.status(200).json({
            sessionId: `${newSession.id}`,
            roleId: `${user.role_id}`,
            username: user.username,
            address: user.address,
            dni: user.dni,
            phone: user.phone
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: `${err}` })
    }
}


/**
 * Función que realiza logout a un usuario.
 */
export const performLogout = async (req, res) => {
    try {
        // Actualizar la sesión del usuario a inactiva (soft delete)
        const updated = await UserSession.update(
            { status: 'INACTIVE' },
            { where: { id: req.sessionId } })
        if (!updated) {
            // Sesión no actualizada
            throw new Error('Couldnt end session')
        }
        res.status(204).json({ message: 'bye' })
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: `${err}` })
    }
}
