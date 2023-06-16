import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { HomePageComponent } from "./home-page/home-page.component";
import { SigninPageComponent } from "./signin-page/signin-page.component";
import { SignupPageComponent } from "./signup-page/signup-page.component";
import { AuthGuardService } from "../services/auth-guard.service";
import { CreateContactPageComponent } from "./create-contact-page/create-contact-page.component";
import { EditContactPageComponent } from "./edit-contact-page/edit-contact-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "signin", component: SigninPageComponent },
  { path: "signup", component: SignupPageComponent },
  {
    path: "home",
    component: HomePageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "create-contact",
    component: CreateContactPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "edit-contact",
    component: EditContactPageComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
  providers: [AuthGuardService],
})
export class AppRoutingModule {
  constructor() {}
}
