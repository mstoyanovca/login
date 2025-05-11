import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JwtService } from '@service/jwt/jwt.service';
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
    private jwtService = inject(JwtService);
    private httpClient = inject(HttpClient);

    onSpanClick() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        /* const user = new User(1234567890, 'Martin', 'Stoyanov', 'abc@gmail.com', 'password', 'admin', false);
        const expiry = Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000);
        const payload = {
            id: user.id,
            name: user.firstName + " " + user.lastName,
            role: user.role,
            expiry: expiry
        };

        const jwt = this.jwtService.generate(payload);
        jwt.then(t => {
            console.log("token = " + t);
            this.jwtService.decode(t).then(dt => console.log("decodedToken = " + JSON.stringify(dt)));
            this.jwtService.hasExpired(t).then(e => console.log("hasExpired = " + JSON.stringify(e)));
        }); */

        this.httpClient.get('http://localhost:8080/login').subscribe(data => console.log('data = ', data));
    }
}
