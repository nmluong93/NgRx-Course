import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

// export const isLoggin = createSelector(
//     state => state["auth"],
//     // check if user existed in auth object
//     auth => !!auth.user
// );

// export const isLoggedout = createSelector(
//     state => state["auth"],
//     // check if user existed in auth object
//     auth => !auth.user
// );




/**
 * Create feature selector to use type-safe and selector for that feature only (data of that feature in store)
 */
export const selectAuthState = createFeatureSelector<AuthState>("auth");


export const isLoggin = createSelector(
    selectAuthState,
    // check if user existed in auth object
    auth => !!auth.user
);

export const isLoggedout = createSelector(
    state => state["auth"],
    // check if user existed in auth object
    auth => !auth.user
);



