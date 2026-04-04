import {TestBed} from '@angular/core/testing';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {jwtInterceptor} from './jwt-interceptor';

describe('JwtInterceptor', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptors([jwtInterceptor]))
            ]
        });
    });

    it('should be created', () => {
        expect(jwtInterceptor).toBeTruthy();
    });
});
