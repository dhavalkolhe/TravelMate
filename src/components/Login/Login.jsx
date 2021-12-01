import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
// import Recaptcha from 'react-recaptcha';

// firebase
import '../../firebase/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

// firestore
import { db } from '../../firebase/db';
import { setDoc, doc, getDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
const auth = getAuth();

function Login() {
    const [user, setUser] = useContext(UserContext);

    const addUser = async (displayName, photoURL, uid) => {
        try {
            setDoc(doc(db, "users", uid), {
                displayName, photoURL
            });
        } catch (e) {
            console.error("Error adding user: ", e);
        }
    }

    const userExists = (uid) => {
        const docRef = doc(db, "users", uid);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .catch((err) => {
                console.log("Error checking user existence: ", err.message);
            })
    }

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {

                const { displayName, photoURL, uid } = result.user;
                const authorized = (result.user.accessToken) ? true : false;

                setUser((prev) => ({
                    ...prev,
                    authorized,
                    displayName,
                    photoURL
                }));

                if (!userExists(uid)) {
                    addUser(displayName, photoURL, uid);
                }

            }).catch((error) => {
                console.log(error.message);
            });
    }

    const logOut = () => {
        signOut(auth).then(() => {
            setUser({
                authorized: false,
                displayName: "",
                photoURL: "",
            })
        }).catch((error) => {
            alert("Error signing out user : ", error.message);
        });
    }
    // const [isVerfied, setIsVerified] = useState(false);

    // function login() {
    //     if (isVerfied) {
    //         signIn();
    //     } else {
    //         alert("Verify captcha first");
    //     }
    // }

    // function onloadCallback() {
    //     console.log("Captcha loaded successfully");
    // }

    // function verifyCallback() {
    //     setIsVerified(true);
    // }

    return (
        (user.authorized) ? (
            <div>
                <img src={user.photoURL} alt="user-img" />
                <br />
                <button onClick={logOut}>Logout</button>
            </div>

        ) : (
            <div>
                {/* <Recaptcha
                sitekey={process.env.REACT_APP_SITE_KEY}
                render="explicit" 
                onloadCallback={onloadCallback}
                verifyCallback={verifyCallback}
                theme="dark"
            /> */}
                <button onClick={signIn}>Login with Google</button>
            </div>)
    )
}

export default Login;