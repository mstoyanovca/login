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
  user = new User(1, 'Martin', 'Stoyanov', 'mstoyanovca@gmail.com', 'password', true);

  onSubmit() {
    console.log("In onSubmit()");
    // this.submitted = true;
  }
}
