import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from "@service/authentication/auth.service";
import {HttpClient} from '@angular/common/http';

import {environment} from "@environment/environment";
import {User} from '@model/user';

@Component({
    selector: 'app-account',
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: 'account.component.html',
    styleUrl: 'account.component.css'
})
export class AccountComponent {
    user: User = new User(0, '', '', '', '', '', false);
    confirmedPassword: string = '';
    passwordIsVisible: boolean = false;
    private accountUrl: string = `${environment.apiUrl}/account`;
    private httpClient: HttpClient = inject(HttpClient);
    private router: Router = inject(Router);
    authService: AuthService = inject(AuthService);

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

    showPassword(): void {
        this.passwordIsVisible = !this.passwordIsVisible;
    }

    logout(): void {
        this.authService.logout();
    }

    onSubmit(): void {
        // TODO: update user in the backend
        console.log("user = " + JSON.stringify(this.user));
    }
}
