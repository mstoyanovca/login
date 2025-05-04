import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { User } from '@model/user';

@Component({
  selector: 'app-register',
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.css'
})
export class RegisterComponent {
  showPassword: boolean = false;
  user = new User(0, '', '', '', '', false);

  onSpanClick() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log("In onSubmit()");
  }
}
