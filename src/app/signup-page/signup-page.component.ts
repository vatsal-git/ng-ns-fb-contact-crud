import { Component } from "@angular/core";
import { TextField, alert } from "@nativescript/core";
import { SignupService } from "./signup.service";
import { Router } from "@angular/router";

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

    // Validate confirm password
    if (this.passwordInput !== this.confirmPasswordInput) {
      this.confirmPasswordValidationMessage = "Passwords do not match";
      return false;
    } else {
      this.confirmPasswordValidationMessage = "";
    }

    return true;
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
    this.signupErrorMessage = error;
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
