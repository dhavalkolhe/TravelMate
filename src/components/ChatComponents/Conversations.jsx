import React, { useEffect, useState, useContext, useRef } from "react";
import "./chatComponenets.css";

import {
  Box,
  Stack,
  Avatar,
  Grid,
  Typography,
  OutlinedInput,
} from "@mui/material";

import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

import { RoomsContext } from "../../context/roomsContext";
import { ChatContext } from "../../context/chatContext";
import { WindowContext } from "../../context";

import Loader from "../../components/Loader/Loader";

const Person = ({
  displayName,
  photoURL,
  roomId,
  handleRoomChange,
  currentCity,
  destinationCity,
}) => {
  return (
    <div
      onClick={() =>
        handleRoomChange(
          roomId,
          displayName,
          photoURL,
          currentCity,
          destinationCity
        )
      }
    >
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
          cursor: "pointer",
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
            <Avatar
              src={photoURL}
              sx={{ width: 48, height: 48, marginRight: "0.4rem" }}
            />
            <Stack direction="column">
              <Typography variant={"body1"}>{displayName}</Typography>
              <Typography variant="caption">
                <>{currentCity.split(",")[0]}</>
                <b> - </b>
                <>{destinationCity.split(",")[0]}</>
              </Typography>
            </Stack>
          </Grid>
          {/* <Grid
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
          </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
};

export const Conversations = () => {
  const { roomData, loading } = useContext(RoomsContext);
  const [roomsData] = roomData;
  const [roomLoading] = loading;

  const [cardData, setCardData] = useState([]);
  const [chatsCount, setChatsCount] = useState(0);

  const { width, height } = useContext(WindowContext);

  const { currRoomId, currChatterInfo, messageBoxInfo } =
    useContext(ChatContext);
  const [roomId, setRoomId] = currRoomId;
  const [chatterInfo, setchatterInfo] = currChatterInfo;
  const [messageBoxOpen, setMessageBoxOpen] = messageBoxInfo;
  const [messageBoxOpenActive, setMessageBoxOpenActive] = useState(false);

  const [searchResults, setSearchResults] = useState(null);

  const handleRoomChange = (roomId, displayName, photoURL) => {
    setRoomId(roomId);
    setchatterInfo({
      displayName: displayName,
      photoURL: photoURL,
    });
    setMessageBoxOpenActive(true);
  };

  useEffect(() => {
    if (width < 900 && messageBoxOpenActive) {
      setMessageBoxOpen(true);
    }
    if (!messageBoxOpen) {
      setMessageBoxOpenActive(false);
    }
    return () => {
      if (width < 900 && messageBoxOpenActive) {
        setMessageBoxOpen(true);
      }
    };
  }, [messageBoxOpenActive, messageBoxOpen]);

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
            handleRoomChange={handleRoomChange}
          />
        );
      });

      setCardData(x);
      setChatsCount(x.length);
    }
  }, [roomsData]);

  return (
    <Grid
      container
      direction={"column"}
      columns={22}
      className="Convcontainer"
      sx={{
        flexWrap: "nowrap",
      }}
    >
      <Grid item xs={1}>
        <Typography variant="h6">Conversations</Typography>
      </Grid>
      <Grid item xs={1}>
        <OutlinedInput placeholder="Search" sx={{ width: "100%" }} />
      </Grid>
      <Grid
        item
        className="conversationsContainer"
        sx={{
          borderTop: "1px solid #313131",
          marginTop: "10px",
          overflowX: "hidden",
          overflowY: "scroll",
          flexWrap: "nowrap",
          height: "100%",
        }}
      >
        {roomLoading ? (
          <Loader />
        ) : (
          <>{chatsCount ? <>{cardData}</> : <p>No Chats!</p>}</>
        )}
      </Grid>
    </Grid>
  );
};
