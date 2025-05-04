import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { User } from '@model/user';

@Component({
  selector: 'app-register',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.css'
})
export class RegisterComponent {
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
