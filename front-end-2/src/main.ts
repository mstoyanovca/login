import { enableProdMode, provideAppInitializer, inject, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { appInitializer } from '@app/helpers/app.initializer';
import { JwtInterceptor } from '@app/helpers/jwt.interceptor';
import { ErrorInterceptor } from '@app/helpers/error.interceptor';
import { fakeBackendProvider } from '@app/helpers/fake-backend';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, Routes } from '@angular/router';
import { environment } from '@environment/environment';
import { AccountService } from '@app/service/account.service';
import { AppComponent } from '@app/app.component';
import { appConfig } from '@app/app.config';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, ReactiveFormsModule),
        provideAppInitializer(() => {
            const initializerFn = (appInitializer)(inject(AccountService));
            return initializerFn();
        }),
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        fakeBackendProvider,
        provideHttpClient(withInterceptorsFromDi()),
        appConfig.providers
    ]
})
    .catch(err => console.error(err));
