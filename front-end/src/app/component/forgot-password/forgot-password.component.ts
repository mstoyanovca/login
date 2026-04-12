import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {environment} from "@environment/environment";

@Component({
    selector: 'app-forgot-password',
    imports: [RouterLink, FormsModule],
    templateUrl: 'forgot-password.component.html',
    styleUrl: 'forgot-password.component.css'
})
export class ForgotPasswordComponent {
    private forgotPasswordUrl: string = `${environment.apiUrl}/forgot-password`;
    private httpClient: HttpClient = inject(HttpClient);
    private router: Router = inject(Router);
    data = {email: ''};

    onSubmit(): void {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.httpClient
            .post<{ email: string }>(this.forgotPasswordUrl, this.data, {headers})
            .subscribe({
                next: (data) => {
                    console.log("sent password reset request for email: ", data.email);
                    this.router.navigate(['/login']);
                },
                error: (error) => {
                    console.log('password reset error: ', error);
                }
            });
    }
}
