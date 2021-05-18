import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppState } from './reducers';
import { isLoggin, isLoggedout } from './auth/auth.selectors';
import { AuthActions } from './auth/action.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;

  isLoggedin$: Observable<boolean>;
  isLoggedout$: Observable<boolean>;

  constructor(private router: Router,
    private store: Store<AppState>) {

  }

  ngOnInit() {

    const user = localStorage.getItem('user');
    if (user) {
      this.store.dispatch(AuthActions.login(JSON.parse(user)));
    }
    this.store.subscribe(state => console.log("Store data : " + state));
    // SELECTOR
    this.isLoggedin$ = this.store.select(isLoggin);
    this.isLoggedout$ = this.store.select(isLoggedout);


    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

}
