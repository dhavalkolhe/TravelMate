import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import { Login } from "./components/Login";
import AddRequest from "./components/AddRequest/AddRequest";

// Contexts
import {
  LoginContextProvider,
  WindowContextProvider,
  ThemeContextProvider,
} from "./context";
import ResponseContextProvider from "./context/responseContext";
import NotificationContextProvider from "./context/notificationContext";
import RoomsContextProvider from "./context/roomsContext";
import ChatContextProvider from "./context/chatContext";
import SearchContextProvider from "./context/searchContext";
import DashboardContextProvider from "./context/dashboardContext";
import SentReqContextProvider from "./context/sentRequests";

import "./firebase/firebase";

import SearchResult from "./pages/SearchResult/SearchResult";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

// Pages
import { Home } from "./pages/Home";
import { Notification } from "./components/Notification";
// import { ChatPage } from "./pages/Chat";
import ChatList from "./components/ChatDemo/ChatList";
import Chat from "./components/ChatDemo/Chat";
import Dashboard from "./components/Dashboard/Dashboard";
import { ChatPage } from "./pages/Chat";

import { BottomNav } from "./components/Nav";
import { UserContext } from "./context/userContext";

// import { MessagesBox } from "./components/ChatComponents";

//Test
// import { SearchBox } from "./components/HomeComponents";

//mui
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MobileFullscreen } from "react-mobile-fullscreen";

const auth = getAuth();

export const Navigation = () => {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: "100vw" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Add Request" icon={<AddCircleIcon />} />
        <BottomNavigationAction
          label="Notifications"
          icon={<NotificationsIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

const Mask = (props) => {
  return (
    <>
      {/* {props.fullscreenType === "native"
        ? "Click Me!"
        : props.fullscreenType === "minimal-ui"
        ? "Swipe Up!"
        : "Mask won't be rendered"} */}
    </>
  );
};

function App() {
  const [user, setUser] = useContext(UserContext);
  const [u, setU] = useState(auth.currentUser);

  useEffect(() => {
    let userData = {};

    onAuthStateChanged(auth, (userFound) => {
      if (!userFound) {
        userData = { authorized: false };
        setU(userData);
      } else {
        userData = {
          authorized: true,
          uid: userFound.uid,
          displayName: userFound.displayName,
          photoURL: userFound.photoURL,
          email: userFound.email,
        };
        setU(userData);
      }
    });
  }, []);

  window.addEventListener("storage", () => {
    const changedData = JSON.parse(window.localStorage.getItem("user"));

    if (JSON.stringify(u) != JSON.stringify(changedData)) {
      // localStorage.setItem("user", JSON.stringify(u));
      setUser({
        authorized: false,
        displayName: "",
        photoURL: "",
        email: "",
      });
    }
  });

  return (
    // <MobileFullscreen mask={Mask}>
    <WindowContextProvider>
      <ThemeContextProvider>
        <SearchContextProvider>
          <LoginContextProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ChatContextProvider>
                <NotificationContextProvider>
                  <SentReqContextProvider>
                    <Router>
                      <Switch>
                        <Route exact path="/addRequest">
                          <AddRequest />
                          <BottomNav />
                        </Route>

                        <Route exact path="/notifications">
                          <Notification />
                          <BottomNav />
                        </Route>

                        <Route exact path="/search">
                          <ResponseContextProvider>
                            <SearchResult />
                            <BottomNav />
                          </ResponseContextProvider>
                        </Route>

                        <Route exact path="/dashboard">
                          <DashboardContextProvider>
                            <Dashboard />
                            <BottomNav />
                          </DashboardContextProvider>
                        </Route>

                        <Route exact path="/chat">
                          <RoomsContextProvider>
                            <ChatPage />
                            <BottomNav />
                          </RoomsContextProvider>
                        </Route>

                        <Route exact path="/">
                          <Home />
                          <BottomNav />
                        </Route>
                      </Switch>
                    </Router>
                  </SentReqContextProvider>
                </NotificationContextProvider>
              </ChatContextProvider>
            </LocalizationProvider>
          </LoginContextProvider>
        </SearchContextProvider>
      </ThemeContextProvider>
    </WindowContextProvider>
    // </MobileFullscreen>
  );
}

export default App;
