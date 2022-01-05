import React, { useEffect, useState, useContext, createContext } from "react";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [roomId, setRoomId] = useState(null);

  return (
    <ChatContext.Provider value={[roomId, setRoomId]}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
