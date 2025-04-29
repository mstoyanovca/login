import { catchError, of } from 'rxjs';

import { AccountService } from 'src/app/_services';

export function appInitializer(accountService: AccountService) {
    return () => accountService.refreshToken()
        .pipe(
            // catch error to start app on success or failure
            catchError(() => of())
        );
}