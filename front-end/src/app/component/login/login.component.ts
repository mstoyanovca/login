import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '@model/user';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css'
})
export class LoginComponent {
    showPassword = false;
    user = new User(0, '', '', '', '', 'admin', false);
    private httpClient = inject(HttpClient);

    onSpanClick() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        this.httpClient
            .post('http://localhost:8080/login', this.user, { responseType: 'text' })
            .subscribe(jwt => localStorage.setItem('jwt', jwt));
    }
}
