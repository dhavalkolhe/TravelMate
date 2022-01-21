import React, { useState, createContext } from "react";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [roomId, setRoomId] = useState(null);
  const [chatterInfo, setchatterInfo] = useState({
    displayName: null,
    photoURL: null,
  });

  return (
    <ChatContext.Provider
      value={{
        currRoomId: [roomId, setRoomId],
        currChatterInfo: [chatterInfo, setchatterInfo],
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
