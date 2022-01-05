import React, { useEffect, useState, useContext } from "react";
import "./chatComponenets.css";

import {
  Box,
  Stack,
  Avatar,
  Grid,
  Typography,
  OutlinedInput,
} from "@mui/material";

import { RoomsContext } from "../../context/roomsContext";
import { ChatContext } from "../../context/chatContext";

import Loader from "../../components/Loader/Loader";

function Person({ displayName, roomId, handleRoomId }) {
  return (
    <div onClick={() => handleRoomId(roomId)}>
      <Grid
        item
        container
        sx={{
          height: "74px",
          marginBottom: "10px",
          borderBottom: "1px solid #313131",
          padding: "0 8px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid
            item
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Avatar sx={{ width: 48, height: 48, marginRight: "0.4rem" }} />
            <Typography variant={"string"}>{displayName}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              height: "32px",
              width: "32px",
              borderRadius: "20px",
              backgroundColor: "#001963",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            2
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export function Conversations() {
  const { roomData, loading } = useContext(RoomsContext);
  const [roomsData] = roomData;
  const [roomLoading] = loading;

  const [cardData, setCardData] = useState([]);
  const [chatsCount, setChatsCount] = useState(0);

  const [roomId, setRoomId] = useContext(ChatContext);

  const handleRoomId = (newRoomId) => {
    setRoomId(newRoomId);
  };

  useEffect(() => {
    if (roomsData.length) {
      const x = roomsData.map((room, i) => {
        return (
          <Person
            key={i}
            currentCity={room.currentCity}
            destinationCity={room.destinationCity}
            displayName={room.displayName}
            photoURL={room.photoURL}
            reqId={room.reqId}
            roomId={room.roomId}
            handleRoomId={handleRoomId}
          />
        );
      });

      setCardData(x);
      setChatsCount(x.length);
    }
  }, [roomsData]);

  return (
    <Grid container direction={"column"} columns={22} className="Convcontainer">
      <Grid item xs={1}>
        <Typography variant="h6">Conversations</Typography>
      </Grid>
      <Grid item xs={1}>
        <OutlinedInput placeholder="Search" sx={{ width: "100%" }} />
      </Grid>
      <Grid item sx={{ borderTop: "1px solid #313131", marginTop: "10px" }}>
        {roomLoading ? (
          <Loader />
        ) : (
          <div>{chatsCount ? cardData : <p>No Chats!</p>}</div>
        )}
      </Grid>
    </Grid>
  );
}
