import { HttpInterceptor } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpEvent } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class Header implements HttpInterceptor {

    /**
     * Http intercept.
     * @param req http request
     * @param next http handler
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'Access-Control-Allow-Origin': '*',
            }
        });
        return next.handle(req);
    }
}