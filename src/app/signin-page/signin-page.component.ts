import { Component } from "@angular/core";
import { ApplicationSettings, TextField } from "@nativescript/core";
import { SigninService } from "../../services/signin.service";
import { Router } from "@angular/router";
import { setUser } from "~/store/user/user.actions";
import { Store } from "@ngrx/store";
import { validateEmail, validatePassword } from "./../../utils/validations";
import { RouterExtensions } from "@nativescript/angular";

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

  constructor(
    private signinService: SigninService,
    private router: Router,
    private routerExtensions: RouterExtensions,
    private store: Store
  ) {}

  onEmailChange(args) {
    let textField = <TextField>args.object;
    this.emailInput = textField.text;
  }

  onPasswordChange(args) {
    let textField = <TextField>args.object;
    this.passwordInput = textField.text;
  }

  isValid() {
    const validateEmailRes = validateEmail(this.emailInput);
    const validatePasswordRes = validatePassword(this.passwordInput);

    this.emailValidationMessage = validateEmailRes.message;
    this.passwordValidationMessage = validatePasswordRes.message;

    return validateEmailRes.isValid && validatePasswordRes.isValid;
  }

  onSigninSuccess(response) {
    console.log("Signin response: ", { response });
    this.store.dispatch(setUser({ user: response.user }));

    response.user.getIdToken().then((token) => {
      this.isLoading = false;
      ApplicationSettings.setString("token", token);
      this.routerExtensions.navigate(["/home"], { clearHistory: true });
    });
  }

  onSigninError(error) {
    this.isLoading = false;
    this.signinErrorMessage = error.code;
    console.error("Signup error: ", { error });
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
