
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    /* Method consulted when a user want to go to a URL that requires login */
    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (this.isLoggedIn(route)) {
            return true;
        }

        // Go home if user is not logged in
        this.router.navigate(['/']);
        return false;
    }

    /* Method that checks is the user is logged in (isLoggedIn parameter in local storage set to true)
    and if the role the user has can access the requested path */
    public isLoggedIn(route: ActivatedRouteSnapshot): boolean {
        let status = false;
        if (localStorage.getItem('isLoggedIn') == "true") {

            status = true;


        } else {
            status = false;
        }
        return status;
    }
}