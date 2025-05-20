import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from '@model/user';
import { PasswordMatchDirective } from '@directive/password-match.directive';

@Component({
    selector: 'app-account',
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: 'account.component.html',
    styleUrl: 'account.component.css'
})
export class AccountComponent {
    private httpClient = inject(HttpClient);
    showPassword: boolean = false;
    user = new User(0, '', '', '', '', 'admin', false);
    confirmedPassword: string = '';

    onSpanClick() {
        this.showPassword = !this.showPassword;
    }

    ngOnInit(): void {
        this.httpClient
            .get<User>('http://localhost:8080/account')
            .subscribe(user => this.user = user);
    }

    onSubmit() {
        console.log("user = " + JSON.stringify(this.user));
    }
}
