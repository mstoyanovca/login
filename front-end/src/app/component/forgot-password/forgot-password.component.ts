import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClient} from "@angular/common/http";

import {environment} from "@environment/environment";
import {User} from "@model/user";

@Component({
    selector: 'app-forgot-password',
    imports: [RouterLink, FormsModule],
    templateUrl: 'forgot-password.component.html',
    styleUrl: 'forgot-password.component.css'
})
export class ForgotPasswordComponent {
    user: User = new User(0, '', '', '', '', '', false);
    private forgotPasswordUrl: string = `${environment.apiUrl}/reset-password`;
    private httpClient: HttpClient = inject(HttpClient);
    private router: Router = inject(Router);

    onSubmit(): void {
        this.httpClient
            .post<User>(this.forgotPasswordUrl, this.user, {responseType: "json"})
            .subscribe({
                next: (_) => {
                    this.router.navigate(['/login']);
                }
            });
    }
}
