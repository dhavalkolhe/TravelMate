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

  const [user] = useContext(UserContext);
  const [authorized, setAuthorized] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    let unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthorized(true);
        setDisplayName(user.displayName);
        setEmail(user.email);
        setPhotoURL(user.photoURL);
      } else {
        setAuthorized(false);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <Box>
      <Container maxWidth="lg">
        <Nav />
      </Container>
      {!authorized ? (
        <h1>Please Login first</h1>
      ) : (
        <div>
          <Box className="dashBg-container">
            <img src={dashBg} alt="dashBg" />
          </Box>
          <Box className="crop">
            <img src={wave} alt="wave" />
          </Box>
          <div className="profile">
            <div className="profile-img-container">
              <img className="profile-img" src={photoURL} alt="user-img" />
            </div>

            <span className="profile-name">{displayName}</span>
            <span className="profile-email">{email}</span>
          </div>
          <div className="activeOffersContainer">
            <span className="active-text">Active Offers</span>
            {activeOffers.length === 0 ? (
              <span className="noActiveText">No active Offers</span>
            ) : (
              <div className="activeOffersCards">{activeOffers}</div>
            )}
          </div>
        </div>
      )}
    </Box>
  );
}

export default Dashboard;
