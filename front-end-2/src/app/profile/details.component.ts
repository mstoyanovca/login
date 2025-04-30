import { Component } from '@angular/core';
import { inject } from "@angular/core";

import { AccountService } from '@app/_services/account.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    templateUrl: 'details.component.html',
    imports: [NgIf, RouterLink]
})
export class DetailsComponent {
    private accountService = inject(AccountService);
    account = this.accountService.accountValue;
}