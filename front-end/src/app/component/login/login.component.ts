import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// import { JwtService } from '@service/jwt/jwt.service';
import { CryptoService } from '@service/crypto/crypto.service';
import { User } from '@model/user';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css'
})
export class LoginComponent {
    // private jwtService = inject(JwtService);
    private cryptoService = inject(CryptoService);
    showPassword = false;
    user = new User(0, '', '', '', '', false);

    onSpanClick() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        this.cryptoService.test();
  }
}
