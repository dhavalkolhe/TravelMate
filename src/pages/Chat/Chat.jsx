import React from "react";

/* Componenets */
import { Nav } from "../../components/Nav";
import { Conversations, MessagesBox } from "../../components/ChatComponents";

/* MUI */
import { Container, Box, Grid } from "@mui/material";

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
        maxWidth="xl"
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
  return (
    <Box sx={{ height: "100vh" }}>
      <DesktopChatSection />
    </Box>
  );
}
