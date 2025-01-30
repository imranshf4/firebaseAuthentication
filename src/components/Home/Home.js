import React, { useEffect, useState } from 'react';
import './Home.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sign_in from '../Sign_in/Sign_in';
const app = initializeApp(firebaseConfig);

const Home = () => {

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',

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
          password: user.password,
          photo: user.photoURL
        });
      } else {
        // If the user is not signed in, clear user data from state
        setUser({
          isSignedIn: false,
          name: '',
          email: '',
          password: '',
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
        const { displayName, email, photoURL, password } = result.user;
        const signedUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          password: password,
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
        password: '',
        photo: ''
      });
    }).catch((error) => {
      // An error happened.
    });
  }




  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
    isValidPassword: false,
  });

  const handleOnBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e.target.value);
      console.log(isFormValid);

    }

    if (e.target.name === 'password') {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/;
      const hasLowerCase = /[a-z]/;
      const hasNumber = /\d/;
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

      const password = e.target.value;

      // Check each condition individually
      const isMinLengthValid = password.length >= minLength;
      const isUpperCaseValid = hasUpperCase.test(password);
      const isLowerCaseValid = hasLowerCase.test(password);
      const isNumberValid = hasNumber.test(password);
      const isSpecialCharValid = hasSpecialChar.test(password);

      // Combine all conditions for overall validity
      isFormValid = isMinLengthValid && isUpperCaseValid && isLowerCaseValid && isNumberValid && isSpecialCharValid;

      // Log password and overall validity
      console.log(password, isFormValid);

      // Show validation status
      // console.log('Password is valid: ', isValidPassword);
      // console.log('Password conditions:');
      // console.log(`Min Length (8+): ${isMinLengthValid ? '✅Valid' : '❌Invalid'}`);
      // console.log(`Uppercase: ${isUpperCaseValid ? 'Valid' : 'Invalid'}`);
      // console.log(`Lowercase: ${isLowerCaseValid ? 'Valid' : 'Invalid'}`);
      // console.log(`Number: ${isNumberValid ? 'Valid' : 'Invalid'}`);
      // console.log(`Special character: ${isSpecialCharValid ? 'Valid' : 'Invalid'}`);

      setPasswordValidation({
        minLength: isMinLengthValid,
        upperCase: isUpperCaseValid,
        lowerCase: isLowerCaseValid,
        number: isNumberValid,
        specialChar: isSpecialCharValid,
        isValidPassword: isFormValid,
      });
    }

    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }

  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      console.log('submitting');
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed up 
          const users = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateName(user.name);

          // ...
        })
        .catch((error) => {
          //const errorCode = error.code;
          const errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          const users = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
        })
        .catch((error) => {
          //const errorCode = error.code;
          const errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  }

  const updateName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }
  const checkMarkIcon = "https://img.icons8.com/?size=100&id=Dt3vlon2kc44&format=png&color=000000";
  const crossMarkIcon = "https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000";
  return (
    <Container>
      {
        user.isSignedIn ?
          <button onClick={handleSignOut}>Sign Out</button>
          :
          <button onClick={handleSignIn}>Sign In With Google</button>
      }
      {
        user.isSignedIn && <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <img src={user.photo} alt="" />

        </div>
      }



      <Form onSubmit={handleSubmit}>
        {/* <p>{user.password}</p>
        <p>{user.email}</p>
        <p>{user.name}</p> */}

        <Form.Check type="checkbox" name="newUser" onClick={() => setNewUser(!newUser)} />
        <Form.Label>New User Sign Up</Form.Label><br />

        {newUser &&

          <Form.Group className="mb-3" controlId="formBasicName">

            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={handleOnBlur} placeholder="Enter name" />

          </Form.Group>}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" onChange={handleOnBlur} placeholder="Enter email" />

        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" name="password" onChange={handleOnBlur} placeholder="Password" />
          <div>
            <p>
              <span>
                Min Length (8+):
                <img
                  src={passwordValidation.minLength ? checkMarkIcon : crossMarkIcon}
                  alt="Valid"
                  style={{ width: "20px", marginRight: "5px" }}
                />
                {passwordValidation.minLength ? 'Valid' : 'Invalid'}
              </span>
            </p>
            <p>
              <span>
                Uppercase: {passwordValidation.upperCase ? '✅ Valid' : '❌ Invalid'}
              </span>
            </p>
            <p>
              <span>
                Lowercase: {passwordValidation.lowerCase ? '✅ Valid' : '❌ Invalid'}
              </span>
            </p>
            <p>
              <span>
                Number: {passwordValidation.number ? '✅ Valid' : '❌ Invalid'}
              </span>
            </p>
            <p>
              <span>
                Special character: {passwordValidation.specialChar ? '✅ Valid' : '❌ Invalid'}
              </span>
            </p>

          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          {
            newUser ? 'Sign Up' : 'Sign In'
          }
        </Button>
      </Form>

      {user.error && <p style={{ color: 'red' }}>Email Already Exist</p>}
      {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Login'} Successfully</p>}
      {/* <Link style={{ textDecoration: 'none' }} to="/sign_in" children={<Sign_in></Sign_in>}>Sign In</Link> */}

    </Container>
  );
};

export default Home;
