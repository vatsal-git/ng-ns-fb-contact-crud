import { Component, OnInit } from "@angular/core";
import { ApplicationSettings } from "@nativescript/core";
import * as firebase from "@nativescript/firebase";
import { Store } from "@ngrx/store";
import { setUser } from "~/store/user/user.actions";

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.firebaseInit();

    const token = ApplicationSettings.getString("token");
    if (token) {
      this.getUser();
    }
  }

  firebaseInit() {
    firebase.firebase.init().then(
      (instance) => {
        console.log("firebase.init done", { instance });
      },
      (error) => {
        console.log("firebase.init error", { error });
      }
    );
  }

  getUser() {
    // const user = JSON.parse(ApplicationSettings.getString("user"));
    // console.log({ user });
    // this.store.dispatch(setUser({ user }));
  }
}
