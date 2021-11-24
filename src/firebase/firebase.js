import { initializeApp } from "firebase/app";
import * as config from "../utils/config";

const firebaseConfig = {
  apiKey: config.REACT_APP_SITE_KEY,
  authDomain: "travelmate-68913.firebaseapp.com",
  projectId: "travelmate-68913",
  storageBucket: "travelmate-68913.appspot.com",
  messagingSenderId: "644389157992",
  appId: "1:644389157992:web:cb9a45e403282390c38fdd",
};

// Initialize Firebase
initializeApp(firebaseConfig);
