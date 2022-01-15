import React, { useState, createContext, useEffect } from "react";

import { UserContext } from "./userContext";

export const LoginContext = createContext();

const UserContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={[]}>{props.children}</LoginContext.Provider>
  );
};

export default UserContextProvider;
