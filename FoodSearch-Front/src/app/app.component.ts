import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AbstractComponent } from './core/components/abstract/abstract.component';
import { ConfigService } from './core/services/service-config/config.service';
import { logout } from './modules/authentification/actions/authentification.actions';
import { isLoggedIn, isLoggedOut } from './modules/authentification/authentification.selectors';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AbstractComponent implements OnInit {

  public title = this.wording('header', 'libelles', 'titre');


  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router, configService: ConfigService) {
    super(configService);
  }
  ngOnInit() {

    this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
      );

    this.isLoggedOut$ = this.store
      .pipe(
        select(isLoggedOut)
      );

  }

  logout(){
    this.store.dispatch(logout());
    this.router.navigateByUrl('/');
  }


}
