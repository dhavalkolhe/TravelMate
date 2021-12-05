import React from "react";

/* Componenets */
import { Nav } from "../../components/Nav";
import { Conversations, Message } from "../../components/ChatComponents";

/* MUI */
import { Container, Box } from "@mui/material";

export function ChatPage() {
  return (
    <>
      <Container maxWidth="lg">
        <Nav />
        <Box>
          <Conversations />
          <Message />
        </Box>
      </Container>
    </>
  );
}
