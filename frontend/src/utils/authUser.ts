import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ROLE_ROUTES_POLICY } from './constants';
import get from 'lodash.get'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const roleId = localStorage.getItem('roleId'); // Check if token exists in local storage or use any other value as per your requirement
        // console.log(this.router.url)
        // console.log(next)
        // console.log(state)
        const isRouteAuthorized = get(ROLE_ROUTES_POLICY, `[${roleId}].${state.url}`, false)
        console.log("Guard for path", state.url)
        console.log(isRouteAuthorized)
        if (isRouteAuthorized) {
            return true; // Allow access to the route
        } else {
            alert("No puedes acceder a este sitio")
            this.router.navigate(['/login'])
            return false
        }
    }
}
