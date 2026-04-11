import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from 'rxjs/operators';
import {environment} from "@environment/environment";

import {User} from "@model/user";

@Injectable({providedIn: 'root'})
export class AuthService {
    private registerUrl = `${environment.apiUrl}/register`;
    private loginUrl = `${environment.apiUrl}/login`;
    private httpClient = inject(HttpClient);

    register(user: User): Observable<User> {
        return this.httpClient
            .post<User>(this.registerUrl, user)
            .pipe(tap(user => {
                user.password = '******';
                console.log("registered a new user: ", JSON.stringify(user));
            }));
    }

    login(user: User): Observable<string> {
        return this.httpClient
            .post(this.loginUrl, user, {responseType: 'text'})
            .pipe(tap(jwt => {
                localStorage.setItem('jwt', jwt);
                console.log("logged in a user with an email: ", user.email);
            }));
    }

    isAuthenticated(): boolean {
        const isAuthenticated = !!localStorage.getItem('jwt');
        console.log('isAuthenticated = ', isAuthenticated);
        return isAuthenticated;
    }

    logout(): void {
        localStorage.removeItem('jwt');
        console.log("logged out...");
    }
}
