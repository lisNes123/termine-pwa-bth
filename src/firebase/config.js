import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

//Push Notifications
// const messaging = getMessaging(firebaseApp);

// const { REACT_APP_VAPID_KEY } = process.env 
// const publicKey = REACT_APP_VAPID_KEY;

// export const getToken = async (setTokenFound) => {
//   let currentToken = '';

//   try{
//     currentToken = await getToken(messaging, { vapidKey: publicKey });
//     if (currentToken) {
//       setTokenFound(true);
//     } else {
//       setTokenFound(false);
//     }
//   } catch (error) {
//     console.log('An error occured while retrieving token', error);
//   }

//   return currentToken;
// };

// export const onMessageListener = () => 
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });

export { 
  firebaseApp, 
  db, 
  storage, 
 };




