import { Routes } from '@angular/router';

import { LoginComponent } from '@component/login/login.component';
import { RegisterComponent } from '@component/register/register.component';
import { ForgotPasswordComponent } from '@component/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from '@component/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];
