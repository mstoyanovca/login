import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from '@app/app.config';
import {enableProdMode} from '@angular/core';
import {environment} from '@environment/environment';
import {AppComponent} from '@app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

if (environment.production) {
    enableProdMode();
    window.console.log = () => {
        // log nothing
    };
    window.console.info = () => {
        // log nothing
    };
    window.console.warn = () => {
        // log nothing
    };
    window.console.debug = () => {
        // log nothing
    };
}
