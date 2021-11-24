import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const localData = localStorage.getItem("user");
  const data = localData
    ? JSON.parse(localData)
    : {
        authorized: false,
        displayName: "",
        photoURL: "",
      };

  const [user, setUser] = useState(data);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
