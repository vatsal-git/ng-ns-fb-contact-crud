import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationExtras,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable, take, tap } from "rxjs";
import { selectIsAuthenticated } from "~/store/user/user.selectors";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(selectIsAuthenticated),
      take(1),
      tap((isAuthenticated) => {
        console.log("Inside authGuardService:", isAuthenticated);
        if (!isAuthenticated) {
          const redirectUrl = state.url;
          const navigationExtras: NavigationExtras = {
            queryParams: { redirectUrl },
            skipLocationChange: true, // Add this line
          };
          this.router.navigate(["/signin"], navigationExtras);
        }
      })
    );
  }
}
