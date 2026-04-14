import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

import {User} from '@model/user';
import {AuthService} from '@service/authentication/auth.service';

@Component({
    selector: 'app-login',
    imports: [FormsModule, CommonModule, RouterLink],
    templateUrl: 'login.component.html',
    styleUrl: 'login.component.css'
})
export class LoginComponent {
    user: User = new User(0, '', '', '', '', 'admin', false);
    showPassword: boolean = false;
    loginError: boolean = false;
    authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    onSpanClick(): void {
        this.showPassword = !this.showPassword;
    }

    onSubmit(): void {
        this.authService.login(this.user)
            .subscribe({
                next: (_) => {
                    this.loginError = false;
                    this.router.navigate(['/account']);
                },
                error: (_) => {
                    this.loginError = true;
                }
            });
    }
}
