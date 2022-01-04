import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Login from "./components/Login/Login";
import AddRequest from "./components/AddRequest/AddRequest";

// Contexts
import UserContextProvider from "./context/userContext";
import ResponseContextProvider from "./context/responseContext";
import NotificationContextProvider from "./context/notificationContext";
import RoomsContextProvider from "./context/roomsContext";
import "./firebase/firebase";

import SearchResult from "./pages/SearchResult/SearchResult";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

// Pages
import { Home } from "./pages/Home";
import Notification from "./components/Notification/Notification";
// import { ChatPage } from "./pages/Chat";
import ChatList from "./components/ChatDemo/ChatList";
import Chat from "./components/ChatDemo/Chat";
import Dashboard from "./components/Dashboard/Dashboard";

import { MessagesBox } from "./components/ChatComponents";

function App() {
  return (
    <UserContextProvider>
      <RoomsContextProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>

              <Route exact path="/addRequest">
                <AddRequest />
              </Route>

              <Route exact path="/search">
                <ResponseContextProvider>
                  <SearchResult />
                </ResponseContextProvider>
              </Route>

              <Route exact path="/user/notifications">
                <NotificationContextProvider>
                  <Notification />
                </NotificationContextProvider>
              </Route>

              {/* <Route exact path="/chat">
                  <ChatPage />
                </Route>
            */}

              <Route exact path="/dashboard">
                <Dashboard />
              </Route>

              <Route exact path="/chat">
                <ChatList />
              </Route>

              <Route exact path="/chat/:roomId">
                <ChatList />
                <Chat />
              </Route>

              <Route exact path="/message">
                <div style={{ height: "100vh", width: "100vw" }}>
                  <MessagesBox />
                </div>
              </Route>

              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </LocalizationProvider>
      </RoomsContextProvider>
    </UserContextProvider>
  );
}

export default App;
