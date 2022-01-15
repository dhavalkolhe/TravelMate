import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomeComponents.css";

import { SearchBox } from "./SearchBox";

import {
  Box,
  Container,
  Grid,
  Stack,
  Button,
  Card,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import illustation1 from "../../resources/images/illustration1.svg";
import bgvector1 from "../../resources/images/bgVector1.svg";

import websiteInfoIcon1 from "../../resources/images/websiteInfoIcon1.svg";
import websiteInfoIcon2 from "../../resources/images/websiteInfoIcon2.svg";
import websiteInfoIcon3 from "../../resources/images/websiteInfoIcon3.svg";

export function SearchSection() {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "0",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "2rem",
              sm: "2.7rem",
              md: "1.5rem",
            },
            marginLeft: {
              xs: "0vw",
              md: "20vw",
            },
            marginTop: "2rem",
            marginBottom: "1rem",
            texAlign: "left",
            letterSpacing: "0.03em",
            textTransform: {
              xs: "normal",
              md: "uppercase",
            },
            color: "#2B2C34",
          }}
        >
          Looking For Someone to travel With?
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: "180px",
            backgroundColor: "#6246EA",
            "&:hover": {
              backgroundColor: "#6251B5",
            },
            "&:active": {
              backgroundColor: "#6251B5",
            },
            display: {
              xs: "flex",
              md: "none",
            },
          }}
          onClick={handleSearchOpen}
        >
          Search For Mate
        </Button>

        <Dialog open={searchOpen} onClose={handleSearchClose}>
          <SearchBox />
        </Dialog>

        <Box
          sx={{
            marginLeft: {
              xs: "10vw",
              lg: "20vw",
            },
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <SearchBox />
        </Box>
      </Container>

      <Box
        sx={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <img src={bgvector1} alt="illus" />
      </Box>
      <Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "0px",
            width: {
              xs: "300px",
              md: "40vw",
            },
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <img src={illustation1} alt="illus" />
        </Box>
      </Box>
    </>
  );
}

export function WebsiteInfo() {
  const Item = ({ image, head, data }) => {
    return (
      <Grid item container direction="column" maxWidth="300px" margin="2rem">
        <Grid item>
          <img src={image} alt={head} />
        </Grid>
        <Grid item>
          <Typography variant="h5">{head}</Typography>
        </Grid>
        <Grid item>
          <Typography>{data}</Typography>
        </Grid>
      </Grid>
    );
  };
  return (
    <Box
      sx={{
        backgroundColor: "#D1D1E9",
      }}
    >
      <Grid
        container
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Item
          image={websiteInfoIcon1}
          head={"Trust who you travel with"}
          data={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        />
        <Item
          image={websiteInfoIcon2}
          head={"Search, Connect and GO!"}
          data={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        />
        <Item
          image={websiteInfoIcon3}
          head={"Chat within the Website"}
          data={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        />
      </Grid>
    </Box>
  );
}
