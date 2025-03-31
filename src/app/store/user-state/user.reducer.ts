import {createReducer, on} from "@ngrx/store";
import {SavedActions} from "../saved-state/saved.actions";
import {UserResponse} from "../../api/models/user-response";
import {UserActions} from "./user.actions";
import {UserState} from "../store.interfaces";
const noUser: UserResponse = {}
export var initialState: UserState = {user: undefined}

export const userReducer = createReducer(
  initialState,
  on(UserActions.login, (state, {user}) => {
    return {user : user}
  }),
  on(UserActions.logout, (_state) => {
    return {user : undefined}
  }),
  on(UserActions.modified, (state, {user}) => {
    return {user : user}
  })
)
