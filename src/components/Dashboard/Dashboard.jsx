import React, { useContext, useState, useEffect } from "react";
import { Nav } from "../../components/Nav";
import { Box, Container } from "@mui/material";
import wave from "../../img/dashWave.svg";
import dashBg from "../../img/dashBg.svg";
import "./Dashboard.css";

import { DashboardContext } from "../../context/dashboardContext";
import { UserContext } from "../../context/userContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

function Dashboard() {
  const activeOffers = useContext(DashboardContext);

  const user = useContext(UserContext);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
      setPhotoURL(user.photoURL);
    } else {
      console.log("Not Authorised");
    }
  });

  return (
    <Box>
      <Container maxWidth="lg">
        <Nav />
      </Container>
      <Box className="dashBg-container">
        <img src={dashBg} alt="dashBg" />
      </Box>
      <Box className="crop">
        <img src={wave} alt="wave" />
      </Box>
      <span>{displayName}</span>
      <span>{email}</span>
      <img src={photoURL} />
      <div>{activeOffers}</div>
    </Box>
  );
}

export default Dashboard;
