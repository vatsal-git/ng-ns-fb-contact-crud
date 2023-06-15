import { createReducer, on } from "@ngrx/store";
import { clearUser, setUser } from "./user.actions";
import { User } from "nativescript-plugin-firebase";
import { ApplicationSettings } from "@nativescript/core";

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user })),
  on(clearUser, (state) => {
    ApplicationSettings.remove("token");
    return { ...state, user: null };
  })
);
