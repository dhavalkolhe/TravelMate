import React, { useState } from "react";
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
import UserContextProvider from "./context/userContext";
import ResponseContextProvider from "./context/responseContext";
import NotificationContextProvider from "./context/notificationContext";
import RoomsContextProvider from "./context/roomsContext";
import ChatContextProvider from "./context/chatContext";
import SearchContextProvider from "./context/searchContext";
import DashboardContextProvider from "./context/dashboardContext";

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

// import { MessagesBox } from "./components/ChatComponents";

//Test
// import { SearchBox } from "./components/HomeComponents";

//mui
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";

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

function App() {
  return (
    <WindowContextProvider>
      <ThemeContextProvider>
        <UserContextProvider>
          <SearchContextProvider>
            <LoginContextProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ChatContextProvider>
                  <NotificationContextProvider>
                    <Router>
                      <Switch>
                        {/* <Route path="/login">
                        <Login />
                      </Route> */}

                        <Route exact path="/addRequest">
                          <AddRequest />
                        </Route>

                        <Route exact path="/search">
                          <ResponseContextProvider>
                            <SearchResult />
                          </ResponseContextProvider>
                        </Route>

                        {/* <Route exact path="/notifications">
                        <Notification />
                      </Route> */}

                        <Route exact path="/dashboard">
                          <DashboardContextProvider>
                            <Dashboard />
                          </DashboardContextProvider>
                        </Route>

                        <Route exact path="/chat">
                          <RoomsContextProvider>
                            <ChatPage />
                          </RoomsContextProvider>
                        </Route>

                        {/* <Route exact path="/chatlist">
                        <ChatList />
                      </Route>

                      <Route exact path="/chat/:roomId">
                        <ChatList />
                        <Chat />
                      </Route> */}

                        <Route exact path="/">
                          <Home />
                        </Route>
                      </Switch>
                    </Router>
                  </NotificationContextProvider>
                </ChatContextProvider>
              </LocalizationProvider>
            </LoginContextProvider>
          </SearchContextProvider>
        </UserContextProvider>
      </ThemeContextProvider>
    </WindowContextProvider>
  );
}

export default App;
