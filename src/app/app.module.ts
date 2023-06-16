import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SigninPageComponent } from "./signin-page/signin-page.component";
import { SignupPageComponent } from "./signup-page/signup-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { StoreModule } from "@ngrx/store";
import { reducers } from "../store";
import { CreateContactPageComponent } from "./create-contact-page/create-contact-page.component";
import { EditContactPageComponent } from "./edit-contact-page/edit-contact-page.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
  ],
  declarations: [
    AppComponent,
    SigninPageComponent,
    SignupPageComponent,
    HomePageComponent,
    CreateContactPageComponent,
    EditContactPageComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
