import { ActionReducerMap } from "@ngrx/store";
import { userReducer } from "./user/user.reducer";

export interface AppState {
  user: any;
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
};
