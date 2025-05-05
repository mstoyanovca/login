import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { User } from '@model/user';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css'
})
export class LoginComponent {
  showPassword: boolean = false;
  user = new User(0, '', '', '', '', false);

  onSpanClick() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log("user.password = " + this.user.password);
  }
}
