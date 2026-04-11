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
    showPassword = false;
    loginError = false;
    user = new User(0, '', '', '', '', 'admin', false);
    authService = inject(AuthService);
    private router = inject(Router);

    onSpanClick() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        this.authService.login(this.user)
            .subscribe({
                next: (_) => {
                    this.loginError = false;
                    this.router.navigate(['/account']);
                },
                error: (error) => {
                    console.log("login error: ", error);
                    this.loginError = true;
                }
            });
    }
}
