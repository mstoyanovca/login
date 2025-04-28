import { provideRouter, Routes } from '@angular/router';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { ApplicationConfig } from '@angular/core';

import { HomeComponent } from './home';
import { SubNavComponent } from './admin/subnav.component';
import { Layout1Component } from './account/layout1.component';
import { Layout2Component } from './admin/layout2.component';
import { Layout3Component } from './profile/layout3.component';
import { OverviewComponent } from './admin/overview.component';
import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account/register.component';
import { VerifyEmailComponent } from './account/verify-email.component';
import { ForgotPasswordComponent } from './account/forgot-password.component';
import { ResetPasswordComponent } from './account/reset-password.component';
import { ListComponent } from './admin/accounts/list.component';
import { AddEditComponent } from './admin/accounts/add-edit.component';
import { DetailsComponent } from './profile/details.component';
import { UpdateComponent } from './profile/update.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'account', component: Layout1Component,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'verify-email', component: VerifyEmailComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent }
        ]
    },
    {
        path: 'profile', component: Layout3Component, canActivate: [AuthGuard],
        children: [
            { path: '', component: DetailsComponent },
            { path: 'update', component: UpdateComponent }
        ]
    },
    { path: 'admin', component: SubNavComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }, outlet: 'subnav' },
    {
        path: 'admin', component: Layout2Component, canActivate: [AuthGuard], data: { roles: [Role.Admin] },
        children: [
            { path: '', component: OverviewComponent },
            { path: 'accounts', component: ListComponent },
            { path: 'accounts/add', component: AddEditComponent },
            { path: 'accounts/edit/:id', component: AddEditComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
};
