import { HttpInterceptor } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JsonSanitizer implements HttpInterceptor {

    /**
     * Http intercept.
     * @param req http request
     * @param next http handler
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        try {
            if (req.body instanceof FormData) {
                return next.handle(req);
            }
            // supprime les clés à null ou parsé en 'undefined'
            const newBody = JSON.stringify(req.body, (key, value) => {
                if (value === null || value  === 'undefined') {
                    return undefined;
                }
                return value;
            });
            req = req.clone({
                body: JSON.parse(newBody)
            });
            return next.handle(req);

        } catch (e) {
            return next.handle(req);
        }
    }
}
