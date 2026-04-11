import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {environment} from "@environment/environment";
import {AuthService} from "@service/authentication/auth.service";
import {HttpClient} from '@angular/common/http';

import {User} from '@model/user';

@Component({
    selector: 'app-account',
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: 'account.component.html',
    styleUrl: 'account.component.css'
})
export class AccountComponent {
    private accountUrl = `${environment.apiUrl}/account`;
    private httpClient = inject(HttpClient);
    private router = inject(Router);
    authService = inject(AuthService);
    passwordIsVisible: boolean = false;
    user = new User(0, '', '', '', '', '', false);
    confirmedPassword: string = '';

    ngOnInit(): void {
        this.httpClient
            .get<User>(this.accountUrl)
            .subscribe(user => {
                if (user == null) {
                    this.router.navigate(['/login']);
                } else {
                    this.user = user;
                }
            });
    }

    showPassword() {
        this.passwordIsVisible = !this.passwordIsVisible;
    }

    logout() {
        this.authService.logout();
    }

    onSubmit() {
        console.log("user = " + JSON.stringify(this.user));
    }
}
