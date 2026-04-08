import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from 'rxjs/operators';

import {User} from "@model/user";

@Injectable({providedIn: 'root'})
export class AuthService {
    private httpClient = inject(HttpClient);

    register(user: User): Observable<User> {
        return this.httpClient
            .post<User>('http://localhost:8080/register', user)
            .pipe(tap(user => {
                user.password = '******';
                console.log("registered a new user: ", JSON.stringify(user));
            }));
    }

    login(user: User): Observable<string> {
        return this.httpClient
            .post('http://localhost:8080/login', user, {responseType: 'text'})
            .pipe(tap(jwt => {
                console.log("logged in user email: ", user.email);
                localStorage.setItem('jwt', jwt);
            }));
    }

    logout(): void {
        console.log("logged out...");
        localStorage.removeItem('token');
    }

    isAuthenticated(): boolean {
        const isAuthenticated = !!localStorage.getItem('token');
        console.log('isAuthenticated = ', isAuthenticated);
        return isAuthenticated;
    }
}
