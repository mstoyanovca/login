import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { User } from '@model/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.css'
})
export class RegisterComponent {
  show: boolean = false;
  user = new User(1, 'Martin', 'Stoyanov', 'mstoyanovca@gmail.com', 'password', true);

  showPassword() {
    this.show = !this.show;
  }
}
