import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";
import { ApplicationSettings } from "@nativescript/core";

export const selectUserState = createFeatureSelector<UserState>("user");

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectUserState,
  (state: UserState) => {
    // Check if token is present in app storage
    const token = ApplicationSettings.getString("token");
    return !!token; // Returns true if token is present, false otherwise
  }
);
