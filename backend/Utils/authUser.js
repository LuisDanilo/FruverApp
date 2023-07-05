import { UserSession } from "../Models/userSession.js"
import { User } from "../Models/user.js"
import { Role } from "../Models/role.js"
import get from 'lodash.get'
import { ShoppingCart } from "../Models/shoppingCart.js"

/**
 * Función que valida si un usuario tiene permiso
 * para realizar la petición a un path determinado.
 * La validación se realiza segun el rol asociado a dicho usuario.
 */
const checkGrant = (user, method, path) => {
    // Obtener la bandera que indica si el rol tiene permisos para el path indicado
    return get(user, `dataValues.role.dataValues.policy.${method}.${path}`, false)
}

/**
 * Funcion middleware que autoriza o no a un usuario
 * Esta función se ejecuta previo a la ejecución de un path
 */
export const authUser = async (req, res, next) => {
    // Obtener el sessionId de las cabeceras
    // Dicho ID es entregado cuando un usuario hace login
    const sessionId = get(req, 'headers["fruver-session-id"]', null)
    // Buscar al usuario, incluido su rol, asociado a la sesión (activa) indicada
    const user = await User.findOne({
        include: [
            { model: UserSession, where: { status: 'ACTIVE', id: sessionId } },
            { model: Role },
            { model: ShoppingCart }
        ]
    })
    if (!sessionId || !checkGrant(user, req.method, req.path)) {
        // No se encontró una sesión o el usuario no tiene permiso
        return res.status(401).json({ message: 'Unauthorized' })
    }
    req.sessionId = sessionId
    req.user = user
    next()
}