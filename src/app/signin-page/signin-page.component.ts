import { Component } from "@angular/core";
import { ApplicationSettings, TextField } from "@nativescript/core";
import { SigninService } from "./signin.service";
import { Router } from "@angular/router";
import { setUser } from "~/store/user/user.actions";
import { Store } from "@ngrx/store";

@Component({
  selector: "ns-signin-page",
  templateUrl: "./signin-page.component.html",
  styleUrls: ["./signin-page.component.css"],
  providers: [SigninService],
})
export class SigninPageComponent {
  emailInput: string = "test@email.com";
  passwordInput: string = "123456";
  emailValidationMessage: string = "";
  passwordValidationMessage: string = "";
  isLoading: boolean = false;
  signinErrorMessage: string = "";
  signinResponse: any;

  constructor(
    private signinService: SigninService,
    private router: Router,
    private store: Store
  ) {
    console.log("Token:", ApplicationSettings.getString("token"));
  }

  onEmailChange(args) {
    let textField = <TextField>args.object;
    this.emailInput = textField.text;
  }
  onPasswordChange(args) {
    let textField = <TextField>args.object;
    this.passwordInput = textField.text;
  }

  isValid() {
    // Validate email
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(this.emailInput)) {
      this.emailValidationMessage = "Invalid email format";
      return false;
    } else {
      this.emailValidationMessage = "";
    }

    // Validate password
    if (this.passwordInput.length < 6) {
      this.passwordValidationMessage =
        "Password should be at least 6 characters long";
      return false;
    } else {
      this.passwordValidationMessage = "";
    }

    return true;
  }
  savedToken: string;

  onSigninSuccess(response) {
    this.signinResponse = response;
    console.log("Signin response: ", response);

    this.store.dispatch(setUser({ user: response.user }));

    response.user.getIdToken().then((token) => {
      ApplicationSettings.setString("token", token);
      this.isLoading = false;
      this.router.navigate(["/home"]);
    });
  }

  onSigninError(error) {
    this.isLoading = false;
    this.signinErrorMessage = error.message;
    console.error("Signup error: ", error);
  }

  onSigninTap() {
    if (this.isValid()) {
      this.isLoading = true;

      this.signinService
        .signin(this.emailInput, this.passwordInput)
        .then((response) => this.onSigninSuccess(response))
        .catch((error) => this.onSigninError(error));
    }
  }
}
