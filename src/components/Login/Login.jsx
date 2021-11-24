import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';

// import Recaptcha from 'react-recaptcha';

// firebase
import '../../firebase/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth();


function Login() {
    const [user, setUser] = useContext(UserContext);

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const { displayName, photoURL } = result.user;
                const authorized = (result.user.accessToken) ? true : false;

                setUser((prev) => ({
                    ...prev,
                    authorized,
                    displayName,
                    photoURL
                }));

            }).catch((error) => {
                console.log(error.message);
            });
    }

    const logOut = () => {
        setUser({
            authorized: false,
            displayName: "",
            photoURL: "",
        })

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