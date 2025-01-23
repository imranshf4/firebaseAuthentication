import React, { useEffect, useState } from 'react';
import './Home.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut, onAuthStateChanged } from "firebase/auth";
const app = initializeApp(firebaseConfig);

const Home = () => {

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  });

   useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is signed in, set user data in state
        setUser({
          isSignedIn: true,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        });
      } else {
        // If the user is not signed in, clear user data from state
        setUser({
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        });
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const { displayName, email, photoURL } = result.user;
        const signedUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(signedUser);
        console.log(result);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      });
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div>
      {
        user.isSignedIn ?
          <button onClick={handleSignOut}>Sign Out</button>
          :
          <button onClick={handleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn && <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <img src={user.photo} alt="" />

        </div>
      }
    </div>
  );
};

export default Home;
