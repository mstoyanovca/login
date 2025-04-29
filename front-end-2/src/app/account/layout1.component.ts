import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AccountService } from 'src/app/_services';

@Component({
    selector: 'layout1',
    templateUrl: 'layout1.component.html',
    imports: [RouterOutlet]
})
export class Layout1Component {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        // redirect to home if already logged in
        if (this.accountService.accountValue) {
            this.router.navigate(['/']);
        }
    }
}