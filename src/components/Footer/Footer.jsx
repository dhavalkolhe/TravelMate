import React from "react";

/* MUI */
import { Box, Stack, Typography } from "@mui/material";

import vitrendzLogo from "../../resources/images/vitrendzLogo.png";
import travelMateFullLogo from "../../resources/images/travelMateFullLogo.svg";
import "./Footer.css";

export function Footer() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#D1D1E9",
          minHeight: "300px",
          marginTop: "4rem",
          padding: "4rem 6rem",
        }}
        className="main-con"
      >
        <Stack
          direction="row"
          sx={{ display: "flex", justifyContent: "space-between" }}
          className="footer-container"
        >
          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "60%",
            }}
            className="logo-section"
          >
            <Box className="vitrendzLogo">
              <img src={vitrendzLogo} alt="VITrendz" />
            </Box>

            <Box className="travelMateFullLogo">
              <img src={travelMateFullLogo} alt="Travel Mate" />
            </Box>
          </Stack>
          <Stack direction="column" className="links-section">
            <a href="/">
              <Typography className="footer-links">Home</Typography>
            </a>
            <a href="/about">
              <Typography className="footer-links">About</Typography>
            </a>
            <a href="/dashboard">
              <Typography className="footer-links">Dashboard</Typography>
            </a>
            <a href="/addRequest">
              <Typography className="footer-links">Add Request</Typography>
            </a>
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          backgroundColor: "#A7ACCE",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "#001963" }} variant="subtitle2">
          All Rights Reserved © 2021
        </Typography>
      </Box>
    </>
  );
}
