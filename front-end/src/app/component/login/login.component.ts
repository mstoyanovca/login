import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { User } from '@model/user';

@Component({
  selector: 'app-login',
  imports: [FontAwesomeModule, FormsModule, RouterLink],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css'
})
export class LoginComponent {
  showPassword: boolean = false;
  user = new User(1, 'Martin', 'Stoyanov', 'mstoyanovca@gmail.com', 'password', true);

  onSpanClick() {
    this.showPassword = !this.showPassword;
    console.log("showPassword = " + this.showPassword);
  }

  onSubmit() {
    console.log("In onSubmit()");
    // this.submitted = true;
  }
}
