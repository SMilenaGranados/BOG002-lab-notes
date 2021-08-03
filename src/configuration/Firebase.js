import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firebase-firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDS7TczuEbRqnRK11CqiiVtlNwHj128fgY",
    authDomain: "all-notes-be0e3.firebaseapp.com",
    projectId: "all-notes-be0e3",
    storageBucket: "all-notes-be0e3.appspot.com",
    messagingSenderId: "762205502384",
    appId: "1:762205502384:web:dbbcdae450794f9241b475",
    measurementId: "G-SH0SXZCM9Q"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  const auth = fire.auth()
  const fires = fire.firestore()
  
  export {auth, fires}
  