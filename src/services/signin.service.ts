import { Injectable } from "@angular/core";
import * as firebase from "@nativescript/firebase/app";

@Injectable({
  providedIn: "root",
})
export class SigninService {
  constructor() {}

  signin(email: string, password: string): Promise<any> {
    console.log("Signin: ", { email, password });

    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
}
