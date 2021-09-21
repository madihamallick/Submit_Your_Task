// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCy9_7_CXntypbcpRGt79EsDIpkkHUZ2bE",
    authDomain: "submityourtask-a67db.firebaseapp.com",
    projectId: "submityourtask-a67db",
    storageBucket: "submityourtask-a67db.appspot.com",
    messagingSenderId: "63552341473",
    appId: "1:63552341473:web:17a8baa1a9d303b5fafea0",
    measurementId: "G-KZYPMCDGHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app)

export { app as default }