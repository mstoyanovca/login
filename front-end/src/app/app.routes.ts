import { Routes } from '@angular/router';

import { LoginComponent } from '@component/login/login.component';
import { RegisterComponent } from '@component/register/register.component';
import { ForgotPasswordComponent } from '@component/forgot-password/forgot-password.component';
import { SecretPageComponent } from '@component/secret-page/secret-page.component';
import { PageNotFoundComponent } from '@component/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'secret-page', component: SecretPageComponent },
  { path: '**', component: PageNotFoundComponent }
];
