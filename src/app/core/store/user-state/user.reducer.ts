import {createReducer, on} from "@ngrx/store";
import {UserActions} from "./user.actions";
import {UserState} from "../store.interfaces";
import {UserDtoDetailed} from "../../../api/models/user-dto-detailed";

export var initialState: UserState = {user: undefined}

export const userReducer = createReducer(
  initialState,
  on(UserActions.login, (state, {user}) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    return {user: user}
  }),
  on(UserActions.logout, (_state) => {
    localStorage.removeItem("loggedInUser");
    return {user: undefined}
  })
)


