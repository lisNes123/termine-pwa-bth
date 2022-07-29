import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } from "firebase/auth";
import React, { useState, useEffect, useContext, createContext } from "react";
import { FirebaseContext } from "./FirebaseContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/config';

const AuthContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [errorAuth, setErrorAuth] = useState(null);
  
  console.log(errorAuth);

  const {firebaseApp} = useContext(FirebaseContext);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const authApp = getAuth(firebaseApp);
  setPersistence(authApp, browserSessionPersistence);

  const signin = ({email, password, callback}) => {
    return signInWithEmailAndPassword(authApp, email, password)
      .then((response) => {
        setUser(response.user);
        callback();
        return response.user;
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          setErrorAuth("Ein falsches Passwort wurde eingegeben");
        } 
        console.log(error);
      });
  };
  const signup = ({email, password, callback}) => {
    createUserWithEmailAndPassword(authApp, email, password)
      .then( async (response) => {
        setUser(response.user);
        await addDoc(collection(db, "users"), {
                // uid: user.uid,
                authProvider: "local",
                email,
              });
        callback();
        return response.user;

      });
  };
  const signout = ({callback}) => {
    return signOut(authApp)
      .then(() => {
        setUser(false);
        callback();
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authApp, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [authApp]);
  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    errorAuth
  };
}