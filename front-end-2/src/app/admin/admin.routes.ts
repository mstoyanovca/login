import { Routes, RouterModule } from '@angular/router';
import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';

export const routes: Routes = [
    { path: 'admin', component: SubNavComponent, outlet: 'subnav', canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    {
        path: 'admin', component: LayoutComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] },
        children: [
            { path: 'admin', component: OverviewComponent },
            { path: 'admin/accounts', loadChildren: accountsModule }
        ]
    }
];
