import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';

import {AccountComponent} from './account.component';
import {routes} from '@app/app.routes';

describe('AccountComponent', () => {
    let component: AccountComponent;
    let fixture: ComponentFixture<AccountComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AccountComponent],
            providers: [
                provideRouter(routes)
            ]
        });

        fixture = TestBed.createComponent(AccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
