import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Login from "./components/Login/Login";
import AddRequest from "./components/AddRequest/AddRequest";

// Contexts
import UserContextProvider from "./context/userContext";
import SearchResult from "./pages/SearchResult/SearchResult";

// Pages
import { Home } from "./pages/Home";

function App() {
  return (
    <UserContextProvider>
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

          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
