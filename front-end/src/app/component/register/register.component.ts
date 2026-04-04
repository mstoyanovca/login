import {Component, inject} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {User} from '@model/user';
import {PasswordMatchDirective} from '@directive/password-match.directive';

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
    private httpClient = inject(HttpClient);

    onSpanClick() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        this.httpClient
            .post('http://localhost:8080/register', this.user)
            .subscribe({
                next: (u) => {
                    // setup response header 201 resource created
                    console.log("registered a new user " + JSON.stringify(u));
                },
                error: (e) => {
                    console.log();
                }
            });
    }
}
