import { Component } from "@angular/core";
import { TextField, alert } from "@nativescript/core";
import { SignupService } from "../../services/signup.service";
import { Router } from "@angular/router";
import { validateEmail, validatePassword } from "~/utils/validations";

@Component({
  selector: "ns-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.css"],
  providers: [SignupService],
})
export class SignupPageComponent {
  emailInput: string = "";
  passwordInput: string = "";
  confirmPasswordInput: string = "";
  emailValidationMessage: string = "";
  passwordValidationMessage: string = "";
  confirmPasswordValidationMessage: string = "";
  isLoading: boolean = false;
  signupErrorMessage: any;
  signupResponse: any;

  constructor(private signupService: SignupService, private router: Router) {}

  onEmailChange(args) {
    let textField = <TextField>args.object;
    this.emailInput = textField.text;
  }
  onPasswordChange(args) {
    let textField = <TextField>args.object;
    this.passwordInput = textField.text;
  }
  onConfirmPasswordChange(args) {
    let textField = <TextField>args.object;
    this.confirmPasswordInput = textField.text;
  }

  isValid() {
    const validateEmailRes = validateEmail(this.emailInput);
    const validatePasswordRes = validatePassword(this.passwordInput);
    const validateConfirmPasswordRes = validatePassword(
      this.confirmPasswordInput
    );

    this.emailValidationMessage = validateEmailRes.message;
    this.passwordValidationMessage = validatePasswordRes.message;
    this.confirmPasswordValidationMessage = validateConfirmPasswordRes.message;

    return (
      validateEmailRes.isValid &&
      validatePasswordRes.isValid &&
      validateConfirmPasswordRes.isValid
    );
  }

  onSignupSuccess(response) {
    this.isLoading = false;
    this.signupResponse = response;
    console.log("Signup response: ", response);
    alert({
      title: "Success",
      message: `Registered user ${response.email} successful!`,
      okButtonText: "Proceed to Signin",
    }).then(() => {
      this.router.navigate(["/signin"]);
    });
  }

  onSignupError(error) {
    this.isLoading = false;
    console.log("Signup error: ", { error });

    this.signupErrorMessage = error.substring(error.lastIndexOf(":") + 2);
    console.error("Signup error: ", error);
  }

  onSignupTap() {
    if (this.isValid()) {
      this.isLoading = true;

      this.signupService
        .signup(this.emailInput, this.passwordInput)
        .then((response) => this.onSignupSuccess(response))
        .catch((error) => this.onSignupError(error));
    }
  }
}
