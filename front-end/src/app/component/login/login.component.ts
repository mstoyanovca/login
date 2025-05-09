import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { JwtService } from '@service/jwt/jwt.service';
import { User } from '@model/user';
import { Buffer } from 'buffer';
import { SignJWT } from 'jose';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css'
})
export class LoginComponent {
    private jwtService = inject(JwtService);
    showPassword = false;
    user = new User(0, '', '', '', '', 'admin', false);

    onSpanClick() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        const header = {
            alg: "HS256",
            typ: "JWT"
        };
        console.log("header = " + JSON.stringify(header));
        const headerBase64 = Buffer.from(JSON.stringify(header), 'utf-8').toString('base64');
        const headerBase64Url = this.toBase64Url(headerBase64);
        console.log("header = " + headerBase64Url);

        const user = new User(1234567890, 'Martin', 'Stoyanov', 'mstoyanovca@gmail.com', 'password', 'admin', false);
        const expiry = Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000);
        const payload = {
            id: user.id,
            name: user.firstName + " " + user.lastName,
            role: user.role,
            expiry: expiry
        };
        console.log("payload = " + JSON.stringify(payload));
        const payloadBase64 = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64');
        const payloadBase64Url = this.toBase64Url(payloadBase64);
        console.log("payload = " + payloadBase64Url);

        const signature = new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .sign(new TextEncoder().encode('secretKey'));
        signature.then(s => console.log("signature = " + JSON.stringify(s)));
    }

    private toBase64Url(base64: string): string {
        return base64.replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }
}
