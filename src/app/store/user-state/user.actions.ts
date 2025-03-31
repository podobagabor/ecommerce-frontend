import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {UserResponse} from "../../api/models/user-response";

export const UserActions = createActionGroup({
  source: "User",
  events: {
    'Login': props<{ user: UserResponse }>(),
    'Logout': emptyProps(),
    'Modified': props<{ user: UserResponse }>(),
  }
})
