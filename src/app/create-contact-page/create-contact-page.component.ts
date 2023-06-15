import { Component, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { TextField } from "@nativescript/core";
import * as imagePickerPlugin from "@nativescript/imagepicker";
import { ContactService } from "../../services/contact.service";

@Component({
  selector: "ns-create-contact-page",
  templateUrl: "./create-contact-page.component.html",
  styleUrls: ["./create-contact-page.component.css"],
  providers: [ContactService],
})
export class CreateContactPageComponent {
  nameInput: string = "test";
  emailInput: string = "testemail@email.com";
  phoneInput: string = "1111111111";
  nameValidationMessage: string = "";
  emailValidationMessage: string = "";
  phoneValidationMessage: string = "";
  photoValidationMessage: string = "";
  imageAssets = [];
  imageSrc: any;
  previewSize: number = 300;
  createContactResponse: any;
  isLoading: boolean = false;
  CreateContactErrorMessage: string = "";

  constructor(private router: Router, private contactService: ContactService) {}

  onCancel() {
    this.router.navigate(["/home"]);
  }

  onNameChange(args) {
    let textField = <TextField>args.object;
    this.nameInput = textField.text;
  }

  onEmailChange(args) {
    let textField = <TextField>args.object;
    this.emailInput = textField.text;
  }

  onPhoneChange(args) {
    let textField = <TextField>args.object;
    this.phoneInput = textField.text;
  }

  onUploadPhotoTap() {
    let imagePicker = imagePickerPlugin.create({
      mode: "single",
      mediaType: 1,
    });

    imagePicker
      .authorize()
      .then(() => imagePicker.present())
      .then((selection) => {
        if (selection.length > 0) {
          console.log({ selection });

          this.imageSrc = selection[0].path;
          this.imageAssets = selection;
        }
      })
      .catch((error) => {
        console.error("Error picking image:", error);
      });
  }

  onRemovePhotoTap() {
    this.imageSrc = null;
  }

  isValid() {
    let valid = true;

    // Validate name
    if (!this.nameInput) {
      this.nameValidationMessage = "Name is required";
      valid = false;
    } else if (!this.isValidName(this.nameInput)) {
      this.nameValidationMessage = "Invalid name format";
      valid = false;
    } else {
      this.nameValidationMessage = "";
    }

    // Validate email
    if (!this.emailInput) {
      this.emailValidationMessage = "Email is required";
      valid = false;
    } else if (!this.isValidEmail(this.emailInput)) {
      this.emailValidationMessage = "Invalid email format";
      valid = false;
    } else {
      this.emailValidationMessage = "";
    }

    // Validate phone
    if (!this.phoneInput) {
      this.phoneValidationMessage = "Phone is required";
      valid = false;
    } else if (!this.isValidPhone(this.phoneInput)) {
      this.phoneValidationMessage = "Invalid phone format";
      valid = false;
    } else {
      this.phoneValidationMessage = "";
    }

    // Validate photo
    if (!this.imageSrc) {
      this.photoValidationMessage = "Photo is required";
      valid = false;
    } else {
      this.photoValidationMessage = "";
    }

    return valid;
  }

  isValidName(name: string): boolean {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  isValidPhone(phone: string): boolean {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  }

  onCreateContactSuccess(response) {
    this.isLoading = false;
    this.createContactResponse = response;
    console.log("CreateContact response: ", response);
    this.router.navigate(["/home"]);

    // this.store.dispatch(setUser({ user: response.user }));

    // response.user.getIdToken().then((token) => {
    //   ApplicationSettings.setString("token", token);
    //   this.isLoading = false;
    //   this.router.navigate(["/home"]);
    // });
  }

  onCreateContactError(error) {
    this.isLoading = false;
    this.CreateContactErrorMessage = error.message;
    console.error("Signup error: ", error);
  }

  onCreateTap() {
    console.log("Create Tapped:", {
      name: this.nameInput,
      email: this.emailInput,
      phone: this.phoneInput,
      profilePhoto: this.imageSrc,
    });

    console.log("IsValid:", this.isValid());

    const contact = {
      name: this.nameInput,
      email: this.emailInput,
      phone: this.phoneInput,
      profilePhoto: this.imageSrc,
    };

    if (this.isValid()) {
      this.isLoading = true;

      this.contactService
        .createContact(contact)
        .then((response) => this.onCreateContactSuccess(response))
        .catch((error) => this.onCreateContactError(error));
    }
  }
}
