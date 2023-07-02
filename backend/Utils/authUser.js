import { UserSession } from "../Models/userSession.js"
import { UserRole } from "../Models/userRole.js"
import { User } from "../Models/user.js"
import { Role } from "../Models/role.js"
import get from 'lodash.get'

/**
 * Funcion que valida si el rol asociado a la sesion puede procesar la solicitud
 */
const checkGrant = (user, method, path) => {

    for(let r of get(user, 'user_roles' , [])) {
        const approved = get(r, `dataValues.role.dataValues.policy.${method}.${path}`, null)
        if(approved) {
            return true
        }
    }
    console.warn(`User ${user.id} not authorized for request ${method} ${path}`);
    return false 
}

/**
 * Funcion middleware para autenticar la peticion segun el rol asociado a la sesion
 * 
 */
export const authUser = async (req, res, next) => {
    const sessionId = get(req, 'headers["fruver-session-id"]', null)
    const user = await User.findOne({
        include: [
            { model: UserSession },
            { model: UserRole, include: [{ model: Role }] }
        ]
    })
    if(!sessionId || !checkGrant(user, req.method, req.path)) {
        return res.status(401).json({ message: 'Unauthorized'}) 
    }
    req.sessionId = sessionId
    next()
}