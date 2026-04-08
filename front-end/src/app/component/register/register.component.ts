import {Component, inject} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

import {User} from '@model/user';
import {PasswordMatchDirective} from '@directive/password-match.directive';
import {AuthService} from '@service/authentication/auth.service';

@Component({
    selector: 'app-register',
    imports: [FontAwesomeModule, FormsModule, CommonModule, RouterLink, PasswordMatchDirective],
    templateUrl: 'register.component.html',
    styleUrl: 'register.component.css'
})
export class RegisterComponent {
    showPassword: boolean = false;
    user = new User(0, '', '', '', '', 'admin', false);
    confirmedPassword: string = '';
    private authService = inject(AuthService);
    private router = inject(Router);

    onSpanClick() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        this.authService
            .register(this.user)
            .subscribe({
                next: (_) => {
                    // setup response header 201 resource created
                    this.router.navigate(['/account']);
                },
                error: (error) => {
                    console.log('registration error: ', error);
                }
            });
    }
}
