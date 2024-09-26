// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  base: "https://beefsenseapiv2-863994867283.southamerica-west1.run.app", // Ruta a la API

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebase:{
    apiKey: "AIzaSyDAM3bd0VKHmBpAZIYuvjTYang1PDVxAsI",
    authDomain: "beefsenseapp.firebaseapp.com",
    projectId: "beefsenseapp",
    storageBucket: "beefsenseapp.appspot.com",
    messagingSenderId: "863994867283",
    appId: "1:863994867283:web:d85d5791cc89d1ff5420a6",
    measurementId: "G-FEZPNWMFFJ"
  }
};

// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);
