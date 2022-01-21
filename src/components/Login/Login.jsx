import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Recaptcha from "react-recaptcha";

// firebase
import "../../firebase/firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

// firestore
import { db } from "../../firebase/db";
import { setDoc, doc, getDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
const auth = getAuth();

function Login() {
  const [user, setUser] = useContext(UserContext);

  const addUser = async (displayName, photoURL, uid) => {
    try {
      setDoc(doc(db, "users", uid), {
        displayName,
        photoURL,
        rooms: [],
        rides: []
      });
    } catch (e) {
      console.error("Error adding user: ", e);
    }
  };

  const userExists = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, photoURL, uid } = result.user;
        console.log(result.user);
        const authorized = result.user.accessToken ? true : false;

        setUser({
          authorized,
          displayName,
          photoURL,
          uid,
        });

        userExists(uid).then((res) => {
          if (!res) {
            addUser(displayName, photoURL, uid);
          } else {
            console.log("User already exists!");
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser({
          authorized: false,
          displayName: "",
          photoURL: "",
        });
      })
      .catch((error) => {
        alert("Error signing out user : ", error.message);
      });
  };
  // eslint-disable-next-line
  const [isVerfied, setIsVerified] = useState(false);

  // function login() {
  //   if (isVerfied) {
  //     signIn();
  //   } else {
  //     alert("Verify captcha first");
  //   }
  // }

  function onloadCallback() {
    console.log("Captcha loaded successfully");
  }

  function verifyCallback() {
    setIsVerified(true);
  }

  return user.authorized ? (
    <div>
      <img src={user.photoURL} alt="user-img" />
      <br />
      <button onClick={logOut}>Logout</button>
    </div>
  ) : (
    <div>
      <Recaptcha
        sitekey={process.env.REACT_APP_SITE_KEY}
        render="explicit"
        onloadCallback={onloadCallback}
        verifyCallback={verifyCallback}
        theme="dark"
      />
      <button onClick={signIn}>Login with Google</button>
    </div>
  );
}

export default Login;
