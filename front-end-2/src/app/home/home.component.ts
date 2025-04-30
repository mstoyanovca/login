import { Component } from '@angular/core';
import { inject } from "@angular/core";

import { AccountService } from '@app/service/account.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    private accountService = inject(AccountService);
    account = this.accountService.accountValue;
}