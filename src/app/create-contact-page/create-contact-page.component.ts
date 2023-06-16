import { Component, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { TextField } from "@nativescript/core";
import * as imagePickerPlugin from "@nativescript/imagepicker";
import { ContactService } from "../../services/contact.service";
import {
  validateEmail,
  validateName,
  validatePhone,
  validatePhoto,
} from "~/utils/validations";

@Component({
  selector: "ns-create-contact-page",
  templateUrl: "./create-contact-page.component.html",
  styleUrls: ["./create-contact-page.component.css"],
  providers: [ContactService],
})
export class CreateContactPageComponent {
  contactForm = {
    name: "",
    email: "",
    phone: "",
    imageSrc: "",
  };

  contactFormValidationMessage = {
    name: "",
    email: "",
    phone: "",
    imageSrc: "",
  };

  isLoading: boolean = false;
  createContactResponse: any;
  createContactErrorMessage: string = "";

  constructor(private router: Router, private contactService: ContactService) {}

  onCancel() {
    this.router.navigate(["/home"]);
  }

  onFormChange(field: string, args) {
    let textField = <TextField>args.object;
    this.contactForm[field] = textField.text;
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
        if (selection.length > 0) this.contactForm.imageSrc = selection[0].path;
      })
      .catch((error) => console.error("Error picking image:", { error }));
  }

  onRemovePhotoTap() {
    this.contactForm.imageSrc = null;
  }

  isValid() {
    const validateNameRes = validateName(this.contactForm.name);
    const validateEmailRes = validateEmail(this.contactForm.email);
    const validatePhoneRes = validatePhone(this.contactForm.phone);
    const validatePhotoRes = validatePhoto(this.contactForm.imageSrc);

    this.contactFormValidationMessage.name = validateNameRes.message;
    this.contactFormValidationMessage.email = validateEmailRes.message;
    this.contactFormValidationMessage.phone = validatePhoneRes.message;
    this.contactFormValidationMessage.imageSrc = validatePhotoRes.message;

    return (
      validateNameRes.isValid &&
      validateEmailRes.isValid &&
      validatePhoneRes.isValid &&
      validatePhotoRes.isValid
    );
  }

  onCreateContactSuccess(response) {
    this.isLoading = false;
    this.createContactResponse = response;
    console.log("Create contact response:", { response });
    this.router.navigate(["/home"]);
  }

  onCreateContactError(error) {
    this.isLoading = false;
    this.createContactErrorMessage = error.message;
    console.error("Create contact error: ", { error });
  }

  onCreateTap() {
    console.log("Create contact tapped:", {
      contactForm: this.contactForm,
    });

    if (this.isValid()) {
      this.isLoading = true;

      this.contactService
        .createContact(this.contactForm)
        .then((response) => this.onCreateContactSuccess(response))
        .catch((error) => this.onCreateContactError(error));
    }
  }
}
