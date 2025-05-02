import { Routes } from '@angular/router';

import { FirstComponent } from '@component/first/first.component';
import { SecondComponent } from '@component/second/second.component';
import { LoginComponent } from '@component/login/login.component';
import { PageNotFoundComponent } from '@component/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
  { path: '**', component: PageNotFoundComponent }
];
