import {Component, inject} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink} from '@angular/router';

import {environment} from "@environment/environment";
import {PasswordMatchDirective} from '@directive/password-match.directive';
import {User} from '@model/user';

@Component({
    selector: 'app-register',
    imports: [FontAwesomeModule, FormsModule, CommonModule, RouterLink, PasswordMatchDirective],
    templateUrl: 'register.component.html',
    styleUrl: 'register.component.css'
})
export class RegisterComponent {
    user: User = new User(null, '', '', '', '', 'ROLE_USER', false);
    confirmedPassword: string = '';
    showPassword: boolean = false;
    registrationError: boolean = false;
    private registerUrl: string = `${environment.apiUrl}/register`;
    private httpClient: HttpClient = inject(HttpClient);
    private router: Router = inject(Router);

    onSpanClick(): void {
        this.showPassword = !this.showPassword;
    }

    onSubmit(): void {
        this.httpClient.post<User>(this.registerUrl, this.user, {responseType: 'json'})
            .subscribe({
                next: (_) => {
                    this.router.navigate(['/login']);
                }, error: (error) => {
                    if (error.status === 409) {
                        this.registrationError = true;
                    }
                }
            });
    }
}
