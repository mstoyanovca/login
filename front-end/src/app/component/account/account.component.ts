import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { User } from '@model/user';
import { PasswordMatchDirective } from '@directive/password-match.directive';

@Component({
    selector: 'app-account',
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: 'account.component.html',
    styleUrl: 'account.component.css'
})
export class AccountComponent {
    showPassword: boolean = false;
    user = new User(0, '', '', '', '', 'admin', false);
    confirmedPassword: string = '';

    onSpanClick() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        console.log("user.password = " + this.user.password + ", confirmedPassword = " + this.confirmedPassword);
    }
}
