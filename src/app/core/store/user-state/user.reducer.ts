import {createReducer, on} from "@ngrx/store";
import {UserActions} from "./user.actions";
import {UserState} from "../store.interfaces";

export var initialState: UserState = {user: undefined}

export const userReducer = createReducer(
  initialState,
  on(UserActions.login, (state, {user}) => {
    return {user: user}
  }),
  on(UserActions.logout, (_state) => {
    return {user: undefined}
  })
)


