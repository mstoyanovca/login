import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AccountService } from '@app/service/account.service';
import { Account } from '@app/model/account';
import { Role } from '@app/model/role';
import { AlertComponent } from '@app/component/alert.component';

@Component({
    selector: 'app-root', templateUrl: 'app.component.html',
    imports: [NgClass, NgIf, RouterLink, RouterLinkActive, RouterOutlet, AlertComponent]
})
export class AppComponent {
    Role = Role;
    account?: Account | null;

    constructor(private accountService: AccountService) {
        this.accountService.account.subscribe(x => this.account = x);
    }

    logout() {
        this.accountService.logout();
    }
}