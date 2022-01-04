import React from "react";
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

function MessageOut({ message }) {
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
          <Typography>{message}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

function MessageIn({ message }) {
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
          <Typography>{message}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export function MessagesBox() {
  return (
    <>
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
          <MessageOut message="Hello" />
          <MessageIn message="Hi" />
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
            >
              <SendIcon sx={{ color: "white" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
