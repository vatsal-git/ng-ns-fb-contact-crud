import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ApplicationSettings } from "@nativescript/core";
import * as firebase from "@nativescript/firebase/app";
import { Store } from "@ngrx/store";
import { User } from "nativescript-plugin-firebase";
import { ContactService } from "~/services/contact.service";
import { clearUser, setUser } from "~/store/user/user.actions";

@Component({
  selector: "ns-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
  providers: [ContactService],
})
export class HomePageComponent implements OnInit {
  user: User;
  error: string = "";
  contactList = [];
  isGetContactsLoading: boolean = false;
  contactsFetchError: string = "";

  constructor(
    private store: Store,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.getUserData();
    this.getContacts();
  }

  onLogoutTap() {
    this.store.dispatch(clearUser());
    const navigationExtras: NavigationExtras = {
      replaceUrl: true,
    };
    this.router.navigate(["/signin"], navigationExtras);
  }

  getUserData() {
    const token = ApplicationSettings.getString("token");
    console.log("Current token:", { token });

    if (token) {
      this.user = firebase.auth().currentUser;

      if (this.user) {
        this.store.dispatch(setUser({ user: this.user }));
      } else {
        // this.error = "User not found" + token;
        // this.store.dispatch(clearUser());
      }
    }
  }

  onCreateTap() {
    this.router.navigate(["/create-contact"]);
  }

  async getContacts() {
    this.contactService
      .getContacts()
      .then((response) => {
        this.contactList = response.docSnapshots.map((docSnapshot) => {
          const data = docSnapshot.data();
          const contactId = docSnapshot.id;
          return { ...data, contactId };
        });

        console.log("Contacts: ", this.contactList);
      })
      .catch((error) => console.log("Error getting contacts", error));
  }

  onDeleteTap(contactId) {
    this.contactService
      .deleteContact(contactId)
      .then(() => {
        this.contactList = this.contactList.filter(
          (contact) => contact.contactId !== contactId
        );
      })
      .catch((error) => console.log("Error deleting contact", error));
  }
}
