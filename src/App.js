import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Login from "./components/Login/Login";
import AddRequest from "./components/AddRequest/AddRequest";

// Contexts
import UserContextProvider from "./context/userContext";
import ResponseContextProvider from "./context/responseContext";
import "./firebase/firebase";

import SearchResult from "./pages/SearchResult/SearchResult";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

// Pages
import { Home } from "./pages/Home";
import Chat from "./components/ChatDemo/Chat";
import { ChatPage } from "./pages/Chat";

import { MessagesBox } from "./components/ChatComponents";

function App() {
  return (
    <ResponseContextProvider>
      <UserContextProvider>
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

              <Route exact path="/chat/:roomId">
                <Chat />
              </Route>

              <Route exact path="/chat">
                <ChatPage />
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
      </UserContextProvider>
    </ResponseContextProvider>
  );
}

export default App;
