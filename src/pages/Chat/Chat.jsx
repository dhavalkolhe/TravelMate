import React, { useContext } from "react";

import { ChatContext } from "../../context";

/* Componenets */
import { Nav } from "../../components/Nav";
import { Conversations, MessagesBox } from "../../components/ChatComponents";

/* MUI */
import { Container, Box, Stack, Grid } from "@mui/material";

function DesktopChatSection() {
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
            <MessagesBox />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export function ChatPage() {
  const { messageBoxInfo } = useContext(ChatContext);
  const [messageBoxOpen] = messageBoxInfo;

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
          }}
        >
          <MessagesBox />
        </Box>
      )}

      <DesktopChatSection />
    </Box>
  );
}
