import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import { Login } from "./components/Login";
import AddRequest from "./components/AddRequest/AddRequest";

// Contexts
import { LoginContextProvider } from "./context";
import UserContextProvider from "./context/userContext";
import ResponseContextProvider from "./context/responseContext";
import NotificationContextProvider from "./context/notificationContext";
import RoomsContextProvider from "./context/roomsContext";
import ChatContextProvider from "./context/chatContext";
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
import { SearchBox } from "./components/HomeComponents";

function App() {
  return (
    <UserContextProvider>
      <LoginContextProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ChatContextProvider>
            <NotificationContextProvider>
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
                    <Notification />
                  </Route>

                  {/* <Route exact path="/chat">
                  <ChatPage />
                </Route>
            */}

                  <Route exact path="/dashboard">
                    <DashboardContextProvider>
                      <Dashboard />
                    </DashboardContextProvider>
                  </Route>

                  <Route exact path="/chat">
                    <RoomsContextProvider>
                      {/* <ChatList /> */}
                      <ChatPage />
                    </RoomsContextProvider>
                  </Route>

                  <Route exact path="/chatlist">
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
            </NotificationContextProvider>
          </ChatContextProvider>
        </LocalizationProvider>
      </LoginContextProvider>
    </UserContextProvider>
  );
}

export default App;
