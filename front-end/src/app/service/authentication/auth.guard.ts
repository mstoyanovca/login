import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private router = inject(Router);

    canActivate(): boolean {
        const token = localStorage.getItem('jwt');
        const isExpired = token ? (new JwtHelperService).isTokenExpired(token) : true;
        if (!isExpired) {
            console.log("authenticated");
            return true;
        } else {
            console.log("unauthenticated");
            this.router.navigate(['/login']);
            return false;
        }
    }
}
