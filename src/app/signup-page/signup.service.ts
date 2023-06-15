import { Injectable } from "@angular/core";
import * as firebase from "@nativescript/firebase/app";

@Injectable({
  providedIn: "root",
})
export class SignupService {
  constructor() {}

  signup(email: string, password: string): Promise<any> {
    console.log("Signup: ", { email, password });

    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
}
