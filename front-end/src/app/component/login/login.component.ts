import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from '@model/user';

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
    private httpClient = inject(HttpClient);
    private router = inject(Router);

    onSpanClick() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        this.httpClient
            .post('http://localhost:8080/login', this.user, { responseType: 'text' })
            .subscribe(
                jwt => {
                    this.loginError = false;
                    console.log("logged in");
                    localStorage.setItem('jwt', jwt);
                    this.router.navigate(['/account']);
                },
                error => this.loginError = true
            );
    }
}
