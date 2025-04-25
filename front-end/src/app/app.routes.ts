import { Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';

export const routes: Routes = [
  { path: 'home', redirectTo: '/' },
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
];
