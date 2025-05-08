import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

import { environment } from '@environment/environment';

interface TokenResponse {
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.apiUrl;
    private jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient) {}

    login(credentials: any): Observable<TokenResponse> {
        return this.http.post<TokenResponse>(`${this.apiUrl}/login`, credentials);
    }

    storeToken(token: string): void {
        localStorage.setItem('access_token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    removeToken(): void {
        localStorage.removeItem('access_token');
    }

    isTokenExpired(): boolean {
        const token = this.getToken();
        return token ? this.jwtHelper.isTokenExpired(token) : true;
    }

    isAuthenticated(): boolean {
        return false;
    }
}
