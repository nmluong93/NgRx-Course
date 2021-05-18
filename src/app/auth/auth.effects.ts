import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthActions } from "./action.types";

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions,
        private router: Router) {
        // actions$.subscribe(action => {
        //     if(action.type === '[Login Page] User Login') {
        //         //action["user"] => get user of action, because here we don't know the type of action
        //         localStorage.setItem('user', JSON.stringify(action["user"]));
        //     }
        // })
        const login$ = createEffect(() =>
            this.actions$
                .pipe(
                    ofType(AuthActions.login),
                    tap(action => localStorage.setItem('user',
                        JSON.stringify(action.user))
                    )
                )
            ,
            { dispatch: false });

        const logout$ = createEffect(() =>
            this.actions$
                .pipe(
                    ofType(AuthActions.logout),
                    tap(action => {
                        localStorage.removeItem('user');
                        this.router.navigateByUrl('/login');
                    })
                )
            , { dispatch: false });



    }
}