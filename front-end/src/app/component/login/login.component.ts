import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JwtService } from '@service/jwt/jwt.service';

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

    onSpanClick() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        const user = new User(1234567890, 'Martin', 'Stoyanov', 'mstoyanovca@gmail.com', 'password', 'admin', false);
        const expiry = Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000);
        const payload = {
            id: user.id,
            name: user.firstName + " " + user.lastName,
            role: user.role,
            expiry: expiry
        };

        const jwt = this.jwtService.generateToken(payload);
        jwt.then(token => this.jwtService.decodeToken(token));
    }

    private toBase64Url(base64: string): string {
        return base64.replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }
}
