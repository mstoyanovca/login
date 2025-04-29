import { Component } from '@angular/core';
import { inject } from "@angular/core";

import { AccountService } from 'src/app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    private accountService = inject(AccountService);
    account = this.accountService.accountValue;
}