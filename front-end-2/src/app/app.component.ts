import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AccountService } from '@app/_services/account.service';
import { Account } from '@app/_models/account';
import { Role } from '@app/_models/role';
import { AlertComponent } from '@app/_components/alert.component';

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