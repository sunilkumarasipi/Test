import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser=this.authenticationService.currentUserValue;
        //return true;
        if (currentUser) {
            // authorised so return true
            return true;
        }
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
