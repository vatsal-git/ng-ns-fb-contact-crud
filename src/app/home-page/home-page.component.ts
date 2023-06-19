import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { Store } from "@ngrx/store";
import { User } from "nativescript-plugin-firebase";
import { ContactService } from "~/services/contact.service";
import { clearUser } from "~/store/user/user.actions";
import { selectUser } from "./../../store/user/user.selectors";

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
    private routerExtensions: RouterExtensions,
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
    this.routerExtensions.navigate(["/signin"], { clearHistory: true });
  }

  getUserData() {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  onCreateTap() {
    this.router.navigate(["/create-contact"]);
  }

  onEditTap(contact) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        DataList: JSON.stringify(contact),
      },
    };
    this.router.navigate(["/edit-contact"], navigationExtras);
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
