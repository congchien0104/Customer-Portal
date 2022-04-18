// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWA3CUdEHBIgsFJGZP_8mPGS8h2HA8tao",
  authDomain: "vexere-image.firebaseapp.com",
  projectId: "vexere-image",
  storageBucket: "vexere-image.appspot.com",
  messagingSenderId: "465478632978",
  appId: "1:465478632978:web:9819a54286c423d7e87acb",
  measurementId: "G-LKR9FXM7D3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
