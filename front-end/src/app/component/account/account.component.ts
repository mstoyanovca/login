import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {User} from '@model/user';

@Component({
    selector: 'app-account',
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: 'account.component.html',
    styleUrl: 'account.component.css'
})
export class AccountComponent {
    private httpClient = inject(HttpClient);
    private router = inject(Router);
    showPassword: boolean = false;
    user = new User(0, '', '', '', '', '', false);
    confirmedPassword: string = '';

    onSpanClick() {
        this.showPassword = !this.showPassword;
    }

    ngOnInit(): void {
        this.httpClient
            .get<User>('http://localhost:8080/account')
            .subscribe(user => {
                if (user == null) {
                    this.router.navigate(['/login']);
                } else {
                    this.user = user;
                }
            });
    }

    onSubmit() {
        console.log("user = " + JSON.stringify(this.user));
    }
}
