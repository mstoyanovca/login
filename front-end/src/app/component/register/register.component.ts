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
    user: User = new User(0, '', '', '', '', 'admin', false);
    confirmedPassword: string = '';
    showPassword: boolean = false;
    private registerUrl: string = `${environment.apiUrl}/register`;
    private httpClient: HttpClient = inject(HttpClient);
    private router: Router = inject(Router);

    onSpanClick(): void {
        this.showPassword = !this.showPassword;
    }

    onSubmit(): void {
        this.httpClient
            .post<User>(this.registerUrl, this.user)
            .subscribe({
                next: (user) => {
                    user.password = '******';
                    console.log("registered a new user: ", JSON.stringify(user));
                    // TODO: setup response header 201 resource created
                    this.router.navigate(['/account']);
                },
                error: (error) => {
                    console.log('registration error: ', error);
                }
            });
    }
}
