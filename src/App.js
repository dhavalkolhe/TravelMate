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
// import Chat from "./components/ChatDemo/Chat";
import Notification from "./components/Notification/Notification";
// import { ChatPage } from "./pages/Chat";
import ChatList from "./components/ChatDemo/ChatList";
import Chat from "./components/ChatDemo/Chat";

function App() {
  return (
    <ResponseContextProvider>
      <UserContextProvider>
        <NotificationContextProvider>
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

                  <Route exact path="/searchRequests">
                    <SearchResult />
                  </Route>

                  <Route exact path="/notifications">
                    <Notification />
                  </Route>

                  {/* <Route exact path="/chat">
                  <ChatPage />
                </Route>
 */}
                  <Route exact path="/chat">
                    <ChatList />
                  </Route>

                  <Route exact path="/chat/:roomId">
                    <ChatList />
                    <Chat />
                  </Route>

                  <Route exact path="/">
                    <Home />
                  </Route>
                </Switch>
              </Router>
            </LocalizationProvider>
          </RoomsContextProvider>
        </NotificationContextProvider>
      </UserContextProvider>
    </ResponseContextProvider>
  );
}

export default App;
