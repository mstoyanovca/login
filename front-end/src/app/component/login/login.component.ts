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
    private jwtService = inject(JwtService);
    showPassword = false;
    user = new User(0, '', '', '', '', 'admin', false);

    onSpanClick() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        const user = new User(1234567890, 'Martin', 'Stoyanov', 'mstoyanovca@gmail.com', 'password', 'admin', false);
        const payload = {
                    "id": 1234567890,
                    "name": 'Martin Stoyanov',
                    "role": 'admin'
                };
        const jwt = this.jwtService.generateToken(payload);
        jwt.then(s => console.log('jwt = ' + JSON.stringify(jwt)));
  }
}
