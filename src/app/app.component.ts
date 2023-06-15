import { Component, OnInit } from "@angular/core";
import * as firebase from "@nativescript/firebase";

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    firebase.firebase.init({ persist: false }).then(
      (instance) => {
        console.log("firebase.init done");
      },
      (error) => {
        console.log(`firebase.init error: $ {error}`, error);
      }
    );
  }
}
