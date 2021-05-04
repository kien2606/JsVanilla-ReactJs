import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBy5LQkNOOIkZODcoscXEqTht8prVOIWrA",
    authDomain: "chat-app-74af2.firebaseapp.com",
    databaseURL: "https://chat-app-74af2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-app-74af2",
    storageBucket: "chat-app-74af2.appspot.com",
    messagingSenderId: "357036921079",
    appId: "1:357036921079:web:fcfc040a2c95964e0f43f2",
    measurementId: "G-286VMCCN3K"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;