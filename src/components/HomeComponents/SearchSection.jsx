import React from "react";
import { Link } from "react-router-dom";

import illustation1 from "../../resources/images/illustration1.svg";
import bgvector1 from "../../resources/images/bgVector1.svg";

import {
  Box,
  Grid,
  Container,
  Stack,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import step1 from "../../resources/images/step1.svg";
import step2 from "../../resources/images/step2.svg";
import step3 from "../../resources/images/step3.svg";
import step4 from "../../resources/images/step4.svg";
import step5 from "../../resources/images/step5.svg";

import websiteInfoIcon1 from "../../resources/images/websiteInfoIcon1.svg";
import websiteInfoIcon2 from "../../resources/images/websiteInfoIcon2.svg";
import websiteInfoIcon3 from "../../resources/images/websiteInfoIcon3.svg";

export function SearchSection() {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            marginLeft: "20vw",
            texAlign: "left",
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            color: "#2B2C34",
          }}
        >
          Looking For Someone to travel With?
        </Typography>
        <Stack
          direction="column"
          sx={{
            backgroundColor: "#DFDFF0",
            borderRadius: "10px",
            width: {
              md: "50vw",
            },
            height: {
              md: "200px",
            },
            marginLeft: "20vw",
          }}
        >
          <Stack direction="row">
            <Stack></Stack>
          </Stack>
        </Stack>
      </Container>

      <Box sx={{ position: "absolute", bottom: "0px", left: "0px" }}>
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
          }}
        >
          <img src={illustation1} alt="illus" />
        </Box>
      </Box>
    </>
  );
}

const Step = ({ image, num, data }) => {
  return (
    <Stack
      display="flex"
      flexFlow="column nowrap"
      justifyContent="center"
      alignItems="center"
    >
      <img src={image} alt={num} />
      <Box>Step {num}</Box>
      <Box>{data}</Box>
    </Stack>
  );
};

export function StepsInfo() {
  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexFlow="column nowrap"
      marginTop="100vh"
    >
      <Box>
        <h2>How it Works</h2>
      </Box>
      <Stack flexFlow="row nowrap" spacing={4}>
        <Step image={step1} num={"1"} data={"lorem ipsum"} />
        <Step image={step2} num={"2"} data={"lorem ipsum"} />
        <Step image={step3} num={"3"} data={"lorem ipsum"} />
        <Step image={step4} num={"4"} data={"lorem ipsum"} />
        <Step image={step5} num={"5"} data={"lorem ipsum"} />
      </Stack>
    </Stack>
  );
}

const ArticleCard = ({ link, website, title }) => {
  return (
    <Card sx={{ minWidth: 275 }} componenet={Link} to={link}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="#000000" gutterBottom>
          {website}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="#000000" gutterBottom>
          {title}
        </Typography>
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
      </CardContent>
    </Card>
  );
};

export function Article() {
  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexFlow="column nowrap"
    >
      <Box>
        <h2>Travelling Safe</h2>
      </Box>
      <Stack direction="row" spacing={4}>
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
    <Box backgroundColor="#D1D1E9">
      <Grid container direction="row">
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
