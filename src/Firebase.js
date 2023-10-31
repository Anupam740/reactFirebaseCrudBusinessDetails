import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCwts9cPeZPoGiNsZ42K4gLPKygPflnlVY",
    authDomain: "bizlistapp-91e21.firebaseapp.com",
    projectId: "bizlistapp-91e21",
    storageBucket: "bizlistapp-91e21.appspot.com",
    messagingSenderId: "381267924785",
    appId: "1:381267924785:web:8e181a4f4db12b4dc90210",
    measurementId: "G-1Z9PY57Q72"
  };
  
// Initialize Firebase (only once)
const fireDb = firebase.initializeApp(firebaseConfig);

// Get a reference to the Realtime Database
const database = fireDb.database();

// Example: Get a reference to a specific node in the database
const dbRef = database.ref('biz-contacts'); // Replace with your desired path

export default dbRef;
