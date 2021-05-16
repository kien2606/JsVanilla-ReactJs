import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBaUDoOvjRKKyERaLLOtZ3dSu8YGZJffq0",
  authDomain: "clone-2c975.firebaseapp.com",
  projectId: "clone-2c975",
  storageBucket: "clone-2c975.appspot.com",
  messagingSenderId: "201716793848",
  appId: "1:201716793848:web:bd42e8bc90df22e102560d",
  measurementId: "G-W61Y2HE079",
};

const firebaseApp = firebase.initializeApp(firebaseConfig );

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db , auth , provider};
