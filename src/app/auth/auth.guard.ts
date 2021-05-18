import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { isLoggin } from "./auth.selectors";

export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>,
        private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       return this.store
       .pipe(
           select(isLoggin),
           tap(isLoggedin => { // side effect
               if(!isLoggedin) {
                this.router.navigateByUrl("/login");
               }
           })
           ); 
    } 
    
}