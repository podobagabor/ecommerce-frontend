import {createReducer, on} from "@ngrx/store";
import {UserActions} from "./user.actions";
import {UserState} from "../store.interfaces";

export var initialState: UserState = {user: undefined}

export const userReducer = createReducer(
  initialState,
  on(UserActions.login, (state, {user}) => {
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    return {user: user}
  }),
  on(UserActions.logout, (_state) => {
    sessionStorage.removeItem("loggedInUser");
    return {user: undefined}
  })
)


