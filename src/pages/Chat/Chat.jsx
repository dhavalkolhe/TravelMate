import React, { useContext, useEffect } from "react";

import { ChatContext, WindowContext } from "../../context";

/* Componenets */
import { Nav } from "../../components/Nav";
import { Conversations, MessagesBox } from "../../components/ChatComponents";

/* MUI */
import { Container, Box, Grid } from "@mui/material";

function DesktopChatSection() {
  const { currChatterInfo } = useContext(ChatContext);
  const [chatterInfo] = currChatterInfo;

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: {
            xs: "none",
            md: "block  ",
          },
        }}
      >
        <Nav />
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          height: {
            xs: "100%",
            md: "calc(100% - 146px)",
          },
        }}
      >
        <Grid
          container
          direction="row"
          sx={{
            height: "100%",
          }}
          spacing={2}
          columns={16}
        >
          <Grid item height="100%" xs={16} md={4}>
            <Conversations />
          </Grid>
          <Grid
            item
            height="100%"
            xs={12}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {chatterInfo.displayName && <MessagesBox />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export function ChatPage() {
  const { messageBoxInfo } = useContext(ChatContext);
  const [messageBoxOpen] = messageBoxInfo;

  const { width, height } = useContext(WindowContext);
  useEffect(() => {}, [width, height]);

  return (
    <Box sx={{ height: "100vh" }}>
      {messageBoxOpen && (
        <Box
          sx={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            backgroundColor: "white",
            zIndex: "5",
            // padding: "10px",
            margin: "0px",
          }}
        >
          <MessagesBox />
        </Box>
      )}

      <DesktopChatSection />
    </Box>
  );
}
