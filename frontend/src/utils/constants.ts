import { UserRoles } from "./enums";

export const BACKEND_HOST = 'http://localhost:3000'

export const ROLE_ROUTES_POLICY = {
    [UserRoles.ADMIN]: {
        '/': true,
        '/products': true,
        '/orders': true
    },
    [UserRoles.USER]: {
        '/': true,
        '/shop': true,
        '/shopping-cart': true,
    }
}