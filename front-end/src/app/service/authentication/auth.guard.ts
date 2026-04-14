import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);

    const token = localStorage.getItem('jwt');
    const isExpired = token ? (new JwtHelperService).isTokenExpired(token) : true;
    if (!isExpired) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
}
