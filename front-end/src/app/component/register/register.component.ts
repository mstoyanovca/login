import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { User } from '@model/user';
import { PasswordMatchDirective } from '@shared/password-match.directive';

@Component({
  selector: 'app-register',
  imports: [FontAwesomeModule, FormsModule, CommonModule, RouterLink, PasswordMatchDirective],
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.css'
})
export class RegisterComponent {
  showPassword: boolean = false;
  user = new User(0, '', '', '', '', false);
  confirmedPassword: string = '';

  onSpanClick() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log("user.password = " + this.user.password + ", confirmedPassword = " + this.confirmedPassword);
  }
}
