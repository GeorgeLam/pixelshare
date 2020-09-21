import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7f27Iu24JjQOd7wp4hK-VzGwYah0nsTo",
  authDomain: "pixelshare-dee1b.firebaseapp.com",
  databaseURL: "https://pixelshare-dee1b.firebaseio.com",
  projectId: "pixelshare-dee1b",
  storageBucket: "pixelshare-dee1b.appspot.com",
  messagingSenderId: "179184967306",
  appId: "1:179184967306:web:8008f9f3c1fc2ac0931773",
  measurementId: "G-FMBPRG8J4X",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
