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
import Toast from "../Toast/Toast";
import { toast } from "react-toastify";

// firestore
import { db } from "../../firebase/db";
import { setDoc, doc, getDoc } from "firebase/firestore";

//mui + UI
import { Box, Stack, Card, Button, Typography } from "@mui/material";
import googleLogo from "../../resources/icons/googleLogo.svg";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const Login = () => {
  const [user, setUser] = useContext(UserContext);

  const notify = (type, message) => {
    toast[type](message);
  };

  const addUser = async (displayName, photoURL, uid) => {
    try {
      setDoc(doc(db, "users", uid), {
        displayName,
        photoURL,
        rooms: [],
        rides: [],
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
        const { displayName, photoURL, uid, email } = result.user;
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

  function login() {
    if (isVerfied) {
      signIn();
    } else {
      notify("error", "Verify captcha first")
    }
  }

  function onloadCallback() {
    console.log("Captcha loaded successfully");
  }

  function verifyCallback() {
    setIsVerified(true);
  }

  return (
    <Card
      sx={{
        minWidth: "315px",
        maxWidth: "540px",
        minHeight: "315px",
        padding: "1rem",
      }}
    >
      <Stack
        direction="column"
        flexWrap="nowrap"
        alignItems="center"
        spacing={2}
      >
        <Box sx={{ width: "64px", height: "64px" }}>
          <img src={googleLogo} alt="Google" />
        </Box>
        <Typography variant="h5">Sign In</Typography>
        <Recaptcha
          sitekey={process.env.REACT_APP_SITE_KEY}
          render="explicit"
          onloadCallback={onloadCallback}
          verifyCallback={verifyCallback}
        />
        <Stack width="100%" alignItems="flex-end">
          <Button variant="contained" onClick={login}>
            Sign In
          </Button>
        </Stack>
      </Stack>
      <Toast />
    </Card>
  );
};
