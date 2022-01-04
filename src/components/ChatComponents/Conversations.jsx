import React from "react";
import "./chatComponenets.css";

import {
  Box,
  Stack,
  Avatar,
  Grid,
  Typography,
  OutlinedInput,
} from "@mui/material";

function Person() {
  return (
    <>
      <Grid
        item
        container
        sx={{
          height: "74px",
          marginBottom: "10px",
          borderBottom: "1px solid #313131",
          padding: "0 8px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid
            item
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Avatar sx={{ width: 48, height: 48, marginRight: "0.4rem" }} />
            <Typography variant={"string"}>User Name</Typography>
          </Grid>
          <Grid
            item
            sx={{
              height: "32px",
              width: "32px",
              borderRadius: "20px",
              backgroundColor: "#001963",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            2
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export function Conversations() {
  return (
    <Grid container direction={"column"} columns={22} className="Convcontainer">
      <Grid item xs={1}>
        <Typography variant="h6">Conversations</Typography>
      </Grid>
      <Grid item xs={1}>
        <OutlinedInput placeholder="Search" sx={{ width: "100%" }} />
      </Grid>
      <Grid item sx={{ borderTop: "1px solid #313131", marginTop: "10px" }}>
        <Person />
        <Person />
        <Person />
      </Grid>
    </Grid>
  );
}
