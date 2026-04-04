import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('jwt');
    if (token) {
        const modifiedReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
        return next(modifiedReq);
    }
    return next(req);
}
