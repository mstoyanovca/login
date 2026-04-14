import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from 'rxjs/operators';

import {environment} from "@environment/environment";
import {User} from "@model/user";

@Injectable({providedIn: 'root'})
export class AuthService {
    private loginUrl: string = `${environment.apiUrl}/login`;
    private httpClient: HttpClient = inject(HttpClient);

    login(user: User): Observable<string> {
        return this.httpClient
            .post(this.loginUrl, user, {responseType: 'text'})
            .pipe(tap(jwt => {
                localStorage.setItem('jwt', jwt);
            }));
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('jwt');
    }

    logout(): void {
        localStorage.removeItem('jwt');
    }
}
