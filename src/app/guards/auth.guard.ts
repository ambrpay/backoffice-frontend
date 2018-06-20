import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private sessionService: SessionService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('we are here');
        if (this.sessionService.isLoggedIn()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
