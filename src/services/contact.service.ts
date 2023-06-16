import { Injectable } from "@angular/core";
import * as firebase from "@nativescript/firebase/app";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  currentUser;

  constructor() {
    this.currentUser = firebase.auth().currentUser;
  }

  // async uploadPhotoAndGetURL(): Promise<string | null> {
  //   const imageURI =
  //     "content://com.android.providers.media.documents/document/image%3A1000000036";

  //   try {
  //     const storageRef = firebase.storage().ref();
  //     const imageName = `${Date.now()}.jpg`;

  //     // Upload the image to Firebase storage
  //     const response = await fetch(imageURI);
  //     const blob = await response.blob();
  //     const uploadTask = storageRef.child(imageName).put(blob);

  //     // Get the downloadable URL for the uploaded image
  //     const snapshot = await uploadTask;
  //     const downloadURL = await snapshot.ref.getDownloadURL();

  //     return downloadURL;
  //   } catch (error) {
  //     console.error("Error uploading photo:", error);
  //     return null;
  //   }
  // }

  createContact(contact): Promise<any> {
    const currentUserUID = this.currentUser.uid;

    return firebase
      .firestore()
      .collection("contacts")
      .doc(currentUserUID)
      .collection("userContacts")
      .add(contact);
  }

  getContacts(): Promise<any | null> {
    const currentUserUID = this.currentUser.uid;

    const contactListRef = firebase
      .firestore()
      .collection("contacts")
      .doc(currentUserUID)
      .collection("userContacts");

    return contactListRef.get();
  }

  editContact(contact): Promise<any> {
    const currentUserUID = this.currentUser.uid;

    return firebase
      .firestore()
      .collection("contacts")
      .doc(currentUserUID)
      .collection("userContacts")
      .doc(contact.contactId)
      .update(contact);
  }

  deleteContact(contactUid): Promise<any | null> {
    const currentUserUID = this.currentUser.uid;

    return firebase
      .firestore()
      .collection("contacts")
      .doc(currentUserUID)
      .collection("userContacts")
      .doc(contactUid)
      .delete();
  }
}
