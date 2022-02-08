import React, { useState } from "react";
// import { Link } from "react-router-dom";

/* Componenets */
import { Nav, BottomNav } from "../../components/Nav";
import {
  SearchSection,
  StepsInfo,
  Article,
  WebsiteInfo,
} from "../../components/HomeComponents";
import { About, MadeBy } from "../../components/AboutUs";
import { Footer } from "../../components/Footer";

import { Box, Container } from "@mui/material";

export function Home() {
  const [overlayDisplay, setoverlayDisplay] = useState("none");

  const homeContext = React.createContext({
    overlayDisplay: overlayDisplay,
    setoverlayDisplay: setoverlayDisplay,
  });

  return (
    <homeContext.Provider>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          zIndex: "10",
          background: "rgba(0, 0, 0, .5) ",
          display: overlayDisplay,
        }}
      ></Box>
      <Container maxWidth="lg">
        <Box sx={{ height: "100vh" }}>
          <Nav />
          <SearchSection />
        </Box>
        <StepsInfo />
        <Article />
        {/* <div>
        <Link to="/addRequest">Add Request</Link>
      </div>
      <div>
        <Link to="/searchRequests">Search Requests</Link>
      </div> */}
      </Container>

      {/* <BottomNav /> */}

      <WebsiteInfo />
      <Container maxWidth="lg" id="about">
        <About />
        {/* <MadeBy /> */}
      </Container>
      <Footer />
    </homeContext.Provider>
  );
}
