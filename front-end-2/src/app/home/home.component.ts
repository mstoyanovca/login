import { Component } from '@angular/core';
import { AccountService } from '@app/_services';
import { inject } from "@angular/core";

@Component({
    templateUrl: 'home.component.html',
    standalone: false
})
export class HomeComponent {
    private accountService = inject(AccountService);
    account = this.accountService.accountValue;
}
