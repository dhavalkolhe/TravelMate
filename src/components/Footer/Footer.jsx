import React from "react";

/* MUI */
import { Box, Stack, Typography } from "@mui/material";

import vitrendzLogo from "../../resources/images/vitrendzLogo.png";
import travelMateFullLogo from "../../resources/images/travelMateFullLogo.svg";

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
      >
        <Stack
          direction="row"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "60%",
            }}
          >
            <Box width="200px">
              <img src={vitrendzLogo} alt="VITrendz" />
            </Box>

            <Box width="200px">
              <img src={travelMateFullLogo} alt="Travel Mate" />
            </Box>
          </Stack>
          <Stack direction="column">
            <Typography>Home</Typography>
            <Typography>About</Typography>
            <Typography>Dashboard</Typography>
            <Typography>Add Request</Typography>
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
