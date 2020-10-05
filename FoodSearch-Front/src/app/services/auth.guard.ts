import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean | UrlTree> {
            return null;
            // this.store.subscribe()
    }


}