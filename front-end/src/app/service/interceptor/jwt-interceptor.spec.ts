import {TestBed} from '@angular/core/testing';
import {jwtInterceptor} from './jwt-interceptor';
import {JwtInterceptor} from "@auth0/angular-jwt";

describe('JwtInterceptor', () => {
    let service: JwtInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(jwtInterceptor);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
