import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { ApplicationSettings } from "@nativescript/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = ApplicationSettings.getString("token");
    console.log({ token });

    if (!token) {
      this.router.navigate(["/signin"]);
      return of(false);
    } else {
      return of(true);
    }
  }
}
