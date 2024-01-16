import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,

    ) {
    }

    canActivate(): boolean {
        if (this.authService.isTokenValid()) {
            return true;

        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }

}
