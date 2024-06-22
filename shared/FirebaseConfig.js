// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClfa-6vXE7VLzDN6weSVfaraz5mYkQG2w",
  authDomain: "ninja-player-10505.firebaseapp.com",
  projectId: "ninja-player-10505",
  storageBucket: "ninja-player-10505.appspot.com",
  messagingSenderId: "922285276050",
  appId: "1:922285276050:web:2b4aa6eb7a05fee0d89f4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }