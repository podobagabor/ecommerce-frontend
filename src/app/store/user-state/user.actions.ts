import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {UserDtoDetailed} from "../../api/models/user-dto-detailed";

export const UserActions = createActionGroup({
  source: "User",
  events: {
    'Login': props<{ user: UserDtoDetailed }>(),
    'Logout': emptyProps(),
    'Modified': props<{ user: UserDtoDetailed }>(),
  }
})
