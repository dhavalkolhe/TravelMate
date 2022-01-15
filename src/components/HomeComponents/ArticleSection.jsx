import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Box, Grid, Stack, Button, Card, Typography } from "@mui/material";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export function Article() {
  const ArticleCard = ({ link, website, title }) => {
    return (
      <Card
        componenet={Link}
        to={link}
        sx={{
          minWidth: "250px",
          maxWidth: "340px",
          height: "180px",
          height: "100%",
          backgroundColor: "#DFDFF0",
        }}
      >
        <Grid
          container
          direction={"column"}
          sx={{ padding: "1rem", height: "100%" }}
        >
          <Grid item>
            <Typography sx={{ fontSize: 14 }} color="#001963" gutterBottom>
              {website}
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              color="#2B2C34"
              gutterBottom
              variant="h6"
              sx={{
                height: "80px",
                overflow: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {title}
            </Typography>
          </Grid>

          <Grid
            item
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            width="100%"
          >
            <Button
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
              sx={{
                backgroundColor: "#001963",
                "&:hover": {
                  backgroundColor: "#062580",
                },
              }}
            >
              Read More
            </Button>
          </Grid>
        </Grid>
      </Card>
    );
  };
  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexFlow="column nowrap"
    >
      <Box>
        <Typography variant="h4">Travelling Safe</Typography>
      </Box>
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{
          margin: "4rem 0 5rem 0",
          width: "100%",
        }}
      >
        <ArticleCard
          link={"https://www.cnbc.com/world/?region=world"}
          website={"www.cnbc.com"}
          title={"7 tips for staying safe while traveling"}
        />
        <ArticleCard
          link={"https://www.cnbc.com/world/?region=world"}
          website={"health.clevelandclinic.org"}
          title={"How to Protect Yourself From the Coronavirus While Traveling"}
        />
        <ArticleCard
          link={"https://www.cnbc.com/world/?region=world"}
          website={"www.cdc.gov"}
          title={"Domestic Travel During COVID-19"}
        />
      </Stack>
    </Stack>
  );
}
