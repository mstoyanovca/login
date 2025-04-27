import { Component } from '@angular/core';
import { inject } from "@angular/core";
import { AccountService } from '@app/_services';

@Component({
    templateUrl: 'details.component.html',
    standalone: false
})
export class DetailsComponent {
    private accountService = inject(AccountService);
    account = this.accountService.accountValue;
}