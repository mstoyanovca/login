import { provideRouter, Routes } from '@angular/router';
import { ApplicationConfig } from '@angular/core';

import { AuthGuard } from '@app/helpers/auth.guard';
import { Role } from '@app/model/role';
import { HomeComponent } from '@app/home/home.component';
import { SubNavComponent } from '@app/admin/subnav.component';
import { Layout1Component } from '@app/account/layout1.component';
import { Layout2Component } from '@app/admin/layout2.component';
import { Layout3Component } from '@app/profile/layout3.component';
import { OverviewComponent } from '@app/admin/overview.component';
import { LoginComponent } from '@app/account/login.component';
import { RegisterComponent } from '@app/account/register.component';
import { VerifyEmailComponent } from '@app/account/verify-email.component';
import { ForgotPasswordComponent } from '@app/account/forgot-password.component';
import { ResetPasswordComponent } from '@app/account/reset-password.component';
import { ListComponent } from '@app/admin/accounts/list.component';
import { AddEditComponent } from '@app/admin/accounts/add-edit.component';
import { DetailsComponent } from '@app/profile/details.component';
import { UpdateComponent } from '@app/profile/update.component';

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
