import { Component, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  selector: "ns-edit-contact-page",
  templateUrl: "./edit-contact-page.component.html",
  styleUrls: ["./edit-contact-page.component.css"],
  providers: [ContactService],
})
export class EditContactPageComponent {
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {
    this.route.queryParams.subscribe(
      (params) => (this.contactForm = JSON.parse(params["DataList"]))
    );
  }

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
        if (selection.length > 0) {
          this.contactForm.imageSrc = selection[0].path;
          console.log("Image:", {
            path: selection[0].path,
            path2: this.contactForm.imageSrc,
          });
        }
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
    console.log("Edit contact response:", { response });
    this.router.navigate(["/home"]);
  }

  onCreateContactError(error) {
    this.isLoading = false;
    this.createContactErrorMessage = error.message;
    console.error("Edit contact error: ", { error });
  }

  onCreateTap() {
    console.log("Edit contact tapped:", {
      contactForm: this.contactForm,
    });

    if (this.isValid()) {
      this.isLoading = true;

      this.contactService
        .editContact(this.contactForm)
        .then((response) => this.onCreateContactSuccess(response))
        .catch((error) => this.onCreateContactError(error));
    }
  }
}
