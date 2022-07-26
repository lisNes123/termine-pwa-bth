import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { enableIndexedDbPersistence } from "firebase/firestore"; 

//TERMIN

const firebaseConfig = {
  apiKey: "AIzaSyA11X4wcwbJGb--Sc6mMGylBTtwEZmJBx0",
  authDomain: "termine-pwa.firebaseapp.com",
  projectId: "termine-pwa",
  storageBucket: "termine-pwa.appspot.com",
  messagingSenderId: "348471972094",
  appId: "1:348471972094:web:a8c6d04a1a644f400d95af"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);



enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
// Subsequent queries will use persistence, if it was enabled successfully



export { 
  firebaseApp, 
  db, 
  storage, 
 };




