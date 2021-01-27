import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBmS6x-em5AyJGkIlhC1nlH5QeoWXlLlEU",
  authDomain: "crwn-db-f6072.firebaseapp.com",
  projectId: "crwn-db-f6072",
  storageBucket: "crwn-db-f6072.appspot.com",
  messagingSenderId: "384668322450",
  appId: "1:384668322450:web:4fac1d69a44c0859c1f44b",
  measurementId: "G-74XPS4S01X",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);
//firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
