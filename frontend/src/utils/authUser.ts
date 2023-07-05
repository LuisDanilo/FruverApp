import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ROLE_ROUTES_POLICY } from './constants';
import get from 'lodash.get'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const roleId = localStorage.getItem('roleId')
        const isRouteAuthorized = get(ROLE_ROUTES_POLICY, `[${roleId}].${state.url}`, false)
        console.log("Guard for path", state.url)
        console.log(isRouteAuthorized)
        if (isRouteAuthorized) {
            return true
        } else {
            alert("No puedes acceder a este sitio")
            this.router.navigate(['/login'])
            return false
        }
    }
}
