import React from "react";
// import { Link } from "react-router-dom";

/* Componenets */
import { Nav } from "../../components/Nav";
import {
  SearchSection,
  StepsInfo,
  Article,
  WebsiteInfo,
} from "../../components/HomeComponents";
import Container from "@mui/material/Container";

export function Home() {
  return (
    <Container maxWidth="lg">
      <Nav />
      <SearchSection />
      <StepsInfo />
      <Article />
      <WebsiteInfo />
      {/* <div>
        <Link to="/addRequest">Add Request</Link>
      </div>
      <div>
        <Link to="/searchRequests">Search Requests</Link>
      </div> */}
    </Container>
  );
}
