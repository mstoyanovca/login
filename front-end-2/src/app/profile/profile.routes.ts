import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { UpdateComponent } from './update.component';

export const routes: Routes = [
    {
        path: 'profile', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'profile', component: DetailsComponent, canActivate: [AuthGuard] },
            { path: 'profile/update', component: UpdateComponent, canActivate: [AuthGuard] }
        ]
    }
];
