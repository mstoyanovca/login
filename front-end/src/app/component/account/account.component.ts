import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {AuthService} from "@service/authentication/auth.service";
import {HttpClient} from '@angular/common/http';

import {environment} from "@environment/environment";
import {PasswordMatchDirective} from '@directive/password-match.directive';
import {User} from '@model/user';

@Component({
    selector: 'app-account',
    imports: [RouterLink, FormsModule, CommonModule, PasswordMatchDirective],
    templateUrl: 'account.component.html',
    styleUrl: 'account.component.css'
})
export class AccountComponent {
    user: User = new User(0, '', '', '', '', '', false);
    confirmedPassword: string = '';
    passwordIsVisible: boolean = false;
    private accountUrl: string = `${environment.apiUrl}/account`;
    private updateUrl: string = `${environment.apiUrl}/update`;
    private httpClient: HttpClient = inject(HttpClient);
    authService: AuthService = inject(AuthService);

    ngOnInit(): void {
        this.httpClient
            .get<User>(this.accountUrl)
            .subscribe(user => {
                this.user = user;
            });
    }

    showPassword(): void {
        this.passwordIsVisible = !this.passwordIsVisible;
    }

    logout(): void {
        this.authService.logout();
    }

    onSubmit(): void {
        this.httpClient
            .put<User>(this.updateUrl, this.user, {responseType: "json"})
            .subscribe({
                next: (user) => {
                    this.user = user;
                }
            });
    }
}
