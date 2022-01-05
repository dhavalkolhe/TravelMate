import React, { useState, useEffect, useContext } from "react";
import "./chatComponenets.css";

import {
  Box,
  Grid,
  Stack,
  Avatar,
  Typography,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

import { ChatContext } from "../../context/chatContext";
import { UserContext } from "../../context/userContext";

import { db } from "../../firebase/db";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
// import Message from "./Message";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL, {
  transports: ["websocket", "polling", "flashsocket"],
  SameSite: "None",
});

function MessageOut({ messageContent }) {
  return (
    <>
      <Grid item container direction="row-reverse" sx={{ width: "100%" }}>
        <Grid
          item
          sx={{
            backgroundColor: "#D1D1E9",
            padding: "10px 20px",
            borderRadius: "20px 20px 0px 20px",
          }}
        >
          <Typography>{messageContent}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

function MessageIn({ messageContent }) {
  return (
    <>
      <Grid item container direction="row" sx={{ width: "100%" }}>
        <Grid
          item
          sx={{
            backgroundColor: "#E5E5F3",
            padding: "10px 20px",
            borderRadius: "20px 20px 20px 0px",
          }}
        >
          <Typography>{messageContent}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export function MessagesBox() {
  const [user] = useContext(UserContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [joined, setJoined] = useState(true);
  const [roomId, setRoomId] = useContext(ChatContext);

  const isMemberOf = async () => {
    const roomData = await getDoc(doc(db, "rooms", roomId));
    return roomData.data().members.includes(user.uid);
  };

  useEffect(() => {
    if (roomId) {
      isMemberOf().then((res) => {
        if (res) {
          try {
            const unsub = socket.emit("join_room", roomId);
            setJoined(true);
            return unsub;
          } catch (err) {
            console.log(err);
          }
        } else {
          setJoined(false);
        }
      });
    }
    //eslint-disable-next-line
  }, [roomId]);

  const fetchSavedMessages = async () => {
    let masterArr = [];
    const q = collection(db, "rooms", roomId, "messages");

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      masterArr.push({ ...doc.data(), time: doc.data().time.toDate() });
    });
    return masterArr;
  };

  useEffect(() => {
    if (roomId) {
      fetchSavedMessages().then((masterArr) => {
        setMessageList(masterArr);
      });
    }
    //eslint-disable-next-line
  }, [roomId]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: roomId,
        msgId: uuidv4(),
        uid: user.uid,
        author: user.displayName,
        message: currentMessage,
        time: new Date(),
      };

      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    //eslint-disable-next-line
  }, [socket]);

  return (
    <>
      {!joined ? (
        <div>
          <h1>This doesn't seem correct!</h1>
        </div>
      ) : (
        <Grid
          container
          spacing={1}
          direction={"column"}
          className="messagesBoxContainer"
          justifyContent={"space-between"}
          sx={{
            padding: {
              xs: "0",
              md: "0 1.5rem",
            },
          }}
        >
          <Grid
            item
            container
            xs={1}
            className="messageHead"
            sx={{
              alignItems: "center",
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"100%"}
              sx={{
                margin: "0 2rem",
              }}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <Avatar sx={{ width: 48, height: 48, marginRight: "0.4rem" }} />
                <Typography variant={"string"}>User Name</Typography>
              </Stack>
              <IconButton>
                <CloseIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Grid>

          <Grid
            item
            container
            xs
            className="messageBox"
            direction="column-reverse"
            sx={{
              height: "100%",
            }}
          >
            {messageList
              .slice(0)
              .reverse()
              .map((messageContent) => {
                return (
                  <>
                    {user.uid === messageContent.uid ? (
                      <MessageOut
                        key={messageContent.msgId}
                        messageContent={messageContent.message}
                        roomId={roomId}
                      />
                    ) : (
                      <MessageIn
                        key={messageContent.msgId}
                        messageContent={messageContent.message}
                        roomId={roomId}
                      />
                    )}
                  </>
                );
              })}
          </Grid>

          <Grid
            item
            container
            spacing={1}
            xs={1}
            className="messageInput"
            alignItems="center"
          >
            <Grid item xs={0.5}>
              <Avatar sx={{ width: 42, height: 42 }} />
            </Grid>

            <Grid item xs>
              <OutlinedInput
                placeholder="Type your message here"
                sx={{ width: "100%" }}
                type="text"
                value={currentMessage}
                onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }}
                onKeyPress={(event) => {
                  event.key === "Enter" && sendMessage();
                }}
              />
            </Grid>

            <Grid item xs={0.5}>
              <IconButton
                fontSize="large"
                sx={{
                  backgroundColor: "#001963",
                  "&:hover": {
                    backgroundColor: "#103193",
                  },
                }}
                onClick={sendMessage}
              >
                <SendIcon sx={{ color: "white" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
