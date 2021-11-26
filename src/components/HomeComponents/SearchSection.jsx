import React from "react";
import { Link } from "react-router-dom";
import "./HomeComponents.css";

import illustation1 from "../../resources/images/illustration1.svg";
import bgvector1 from "../../resources/images/bgVector1.svg";
import locationIcon from "../../resources/icons/locationIcon.svg";
import destinationIcon from "../../resources/icons/destinationIcon.svg";
// import dateIcon from "../../resources/icons/dateIcon.svg";

import {
  Box,
  Grid,
  Container,
  Stack,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  // Input,
  TextField,
  InputAdornment,
  // OutlinedInput,
  IconButton,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

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
            marginTop: "2rem",
            marginBottom: "1rem",
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
          spacing={4}
          sx={{
            backgroundColor: "#DFDFF0",
            borderRadius: "10px",
            width: {
              md: "50vw",
            },
            height: {
              md: "170px",
            },
            marginLeft: "20vw",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack direction="column" spacing={4}>
            <Stack direction="row">
              <FormControl variant="outlined" sx={{ zIndex: "1" }}>
                <Stack direction={"row"} spacing={2} alignItems="flex-end">
                  <Box>
                    <Typography class="textfieldHead">
                      Traveling from
                    </Typography>
                    <TextField
                      size="small"
                      placeholder="Enter Location"
                      sx={{
                        width: "190px",
                        backgroundColor: "white",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton edge="start">
                              <img src={locationIcon} alt={"logo"} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography class="textfieldHead">Destination</Typography>
                    <TextField
                      size="small"
                      placeholder="Enter Location"
                      sx={{
                        width: "190px",
                        backgroundColor: "white",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton edge="start">
                              <img src={destinationIcon} alt={"logo"} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography class="textfieldHead">Date</Typography>
                    {/* <TextField
                      size="small"
                      placeholder="DD-MM-YYYY"
                      sx={{
                        width: "160px",
                        backgroundColor: "white",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton edge="start">
                              <img src={dateIcon} alt={"logo"} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    /> */}

                    <DatePicker
                      openTo="day"
                      views={["month", "day"]}
                      // value={value}
                      // onChange={(newValue) => {
                      //   setValue(newValue);
                      // }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          // placeholder="DD-MM-YYYY"
                          sx={{
                            width: "160px",
                            backgroundColor: "white",
                          }}
                          // InputProps={{
                          //   startAdornment: (
                          //     <InputAdornment position="start">
                          //       <IconButton edge="start">
                          //         <img src={dateIcon} alt={"logo"} />
                          //       </IconButton>
                          //     </InputAdornment>
                          //   ),
                          // }}
                        />
                      )}
                    />
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<SearchOutlinedIcon />}
                    sx={{
                      backgroundColor: "#001963",
                      "&:hover": {
                        backgroundColor: "#062580",
                      },
                      height: "40px",
                      width: "150px",
                    }}
                  >
                    Search
                  </Button>
                </Stack>
              </FormControl>
            </Stack>
            <Box display="flex" justifyContent="space-between">
              <Typography class="redText">Add request</Typography>
              <Typography class="redText">
                <u>Help?!</u>
              </Typography>
            </Box>
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

export function StepsInfo() {
  const Step = ({ image, num, data }) => {
    return (
      <Stack
        display="flex"
        flexFlow="column nowrap"
        justifyContent="center"
        alignItems="center"
      >
        <img src={image} alt={num} />
        <Typography class="stepsInfoHead">Step {num}</Typography>
        <Typography class="stepsInfoData">{data}</Typography>
      </Stack>
    );
  };
  return (
    <>
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexFlow="column nowrap"
        sx={{
          marginTop: "65vh",
        }}
      >
        <Box>
          <Typography variant="h5">How it Works</Typography>
        </Box>
        <Stack direction="row" spacing={4} sx={{ margin: "5rem 0" }}>
          <Step
            image={step1}
            num={"1"}
            data={
              "Search for relevent results if nothing comes up add a request"
            }
          />
          <Step
            image={step2}
            num={"2"}
            data={"Go through the results and send a request"}
          />
          <Step
            image={step3}
            num={"3"}
            data={"Chat with the person and discuss "}
          />
          <Step
            image={step4}
            num={"4"}
            data={"Remove the request if you find someone"}
          />
          <Step image={step5} num={"5"} data={"Travel Safe.\nTravel Mate."} />
        </Stack>
      </Stack>
    </>
  );
}

export function Article() {
  const ArticleCard = ({ link, website, title }) => {
    return (
      <Card
        componenet={Link}
        to={link}
        sx={{
          width: "50%",
          backgroundColor: "#DFDFF0",
        }}
      >
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
  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexFlow="column nowrap"
    >
      <Box>
        <Typography variant="h5">Travelling Safe</Typography>
      </Box>
      <Stack direction="row" spacing={4} sx={{ margin: "5rem 0" }}>
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
