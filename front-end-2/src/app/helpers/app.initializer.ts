import { catchError, of } from 'rxjs';

import { AccountService } from '@app/service/account.service';

export function appInitializer(accountService: AccountService) {
    return () => accountService.refreshToken()
        .pipe(
            // catch error to start app on success or failure
            catchError(() => of())
        );
}