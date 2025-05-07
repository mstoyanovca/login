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
        /* const id = 1234567890  // account.id
        const name = "Martin Stoyanov";  // account.firstName + " " + account.lastName
        const role = "admin";  // account.role = "admin"/"user"
        // 15 minutes:
        const expiry = Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000);
        const payload = {
            "id": id,
            "name": name,
            "role": role,
            "expiry": expiry
        };

        const jwt = this.cryptoService.encrypt(JSON.stringify(payload));
        jwt.then(s =>
            {
                console.log(s);
                this.cryptoService.decrypt(s).then(s => console.log(s));
            }
        ); */
  }
}
