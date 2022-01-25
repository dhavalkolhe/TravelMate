import React, { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import "./AddRequest.css";
import currentLocationIcon from "../../img/currentLocationIcon.svg";
import destinationLocationIcon from "../../img/destinationLocationIcon.svg";
import addReqBg from "../../img/addReqBg.svg";
import dateIcon from "../../img/dateIcon.svg";
import { UserContext } from "../../context/userContext";
import wavesDesign from "../../img/wavesDesign.svg";
import plus from "../../img/plus.svg";
import minus from "../../img/minus.svg";
import { Nav } from "../Nav/Nav";
import { About, MadeBy } from "../AboutUs/AboutUs";
import { Footer } from "../Footer/Footer";
import { WebsiteInfo } from "../../components/HomeComponents";
import city from "../../resources/states.json";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Toast from "../Toast/Toast";
import { toast } from "react-toastify";

import {
  Box,
  Container,
  FormControl,
  Stack,
  Typography,
  Button,
  Select,
  MenuItem,
  InputBase,
  createFilterOptions,
  Autocomplete,
  TextField,
  FormGroup,
} from "@mui/material";

// firebase
import { db } from "../../firebase/db";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

function AddRequest() {
  const [draftSaved, setDraftSaved] = useState(false);
  const [authorized, setAuthorized] = useState(true);

  let draftData = {};
  const localData = localStorage.getItem("TravelmateRideDrafts");
  if (localData) {
    draftData = JSON.parse(localData);
  } else {
    draftData = {
      currentCity: "",
      destinationCity: "",
      date: new Date(),
      time: "Any",
      mode: "Any",
      gender: "Any",
      nop: 1,
      description: "",
    };
  }

  useEffect(() => {
    if (localData) {
      setDraftSaved(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [user] = useContext(UserContext);
  const [currentCity, setCurrentCity] = useState(draftData.currentCity);
  const [destinationCity, setDestinationCity] = useState(
    draftData.destinationCity
  );
  const [date, setDate] = useState(new Date(draftData.date));
  // eslint-disable-next-line
  const [time, setTime] = useState(draftData.time);
  // eslint-disable-next-line
  const [mode, setMode] = useState(draftData.mode);
  const [gender, setGender] = useState(draftData.gender);
  const [nop, setNop] = useState(draftData.nop);
  const [description, setDescription] = useState(draftData.description);
  // eslint-disable-next-line

  //Toast Function
  const notify = (type, message) => {
    toast[type](message);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    });
  }, []);

  const formValidation = () => {
    if (currentCity && destinationCity && date && time && gender && nop && mode)
      return true;
    else return false;
  };

  const makeDraft = (e) => {
    e.preventDefault();
    if (!draftSaved) {
      const draft = {
        currentCity,
        destinationCity,
        date,
        time,
        mode,
        gender,
        nop,
        description,
      };
      localStorage.setItem("TravelmateRideDrafts", JSON.stringify(draft));
    } else {
      draftData = {
        currentCity: "",
        destinationCity: "",
        date: new Date(),
        time: "Any",
        mode: "Any",
        gender: "Any",
        nop: 1,
        description: "",
      };
      localStorage.removeItem("TravelmateRideDrafts");
    }
    setDraftSaved(!draftSaved);
  };

  const updateUserRides1 = async (rideId) => {
    const userRideRef = doc(db, "users", user.uid, "rides", rideId);
    await setDoc(userRideRef, {
      rooms: [],
      requests: [],
    });
  };
  const updateUserRides2 = async (rideId) => {
    const userRideRef = doc(db, "users", user.uid);
    await updateDoc(userRideRef, {
      rides: arrayUnion(rideId),
    });
  };

  // Confirm Popup
  const confirmSubmit = () => {
    if (formValidation()) {
      confirmAlert({
        message: "Do you want to continue?",
        buttons: [
          {
            label: "Yes",
            className: "yesButton",
            onClick: () => {
              addRequest();
            },
          },
          {
            label: "No",
            className: "noButton",
            //onClick: () => alert("Cancelled"),
          },
        ],
      });
    } else {
      //alert("Please enter all the fields!");
      notify("warning", "Enter Required Fields");
    }
  };

  //////////////////////////////
  const addRequest = async () => {
    if (!draftSaved) setDate(date.setHours(0, 0, 0, 0));

    try {
      let docref = await addDoc(collection(db, "rides"), {
        currentCity,
        destinationCity,
        date,
        time,
        mode,
        gender,
        nop,
        description,
        displayName: user.displayName,
        photoURL: user.photoURL,
        userId: user.uid,
      });

      updateUserRides1(docref.id);
      updateUserRides2(docref.id);
      notify("success", "Request Added");

      if (!draftSaved) {
        setCurrentCity("");
        setDestinationCity("");
        setGender("Any");
        setNop(1);
        setDescription("");
        setDate(new Date());
        setMode(draftData.mode);
        setTime(draftData.time);
      }
    } catch (e) {
      console.log("Error adding document: ", e);
      notify("error", "Request Addition Failed");
    }
  };

  const OPTIONS_LIMIT = 3;
  const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT,
  });

  return (
    <Box>
      <Container maxWidth="lg">
        <Nav />
      </Container>

      {authorized ? (
        <div>
          <Container maxWidth="xl" className="wrapper-container">
            <Typography className="title">Add Request</Typography>
            <Stack spacing={2}>
              <FormControl>
                <Stack direction="row" className="stack-item">
                  <Typography class="textfieldHead">Traveling from</Typography>
                  <div className="location-wrap">
                    <img
                      src={currentLocationIcon}
                      alt="logo"
                      className="icons"
                    />
                    <Autocomplete
                      className="location-input-field"
                      value={currentCity}
                      filterOptions={filterOptions}
                      id="country-select-demo"
                      sx={{ width: "100%" }}
                      options={city}
                      autoHighlight
                      disableClearable
                      freeSolo
                      getOptionLabel={(option) => option.name || currentCity}
                      onChange={(event, value) => {
                        // console.log(value);
                        let selectedCity = value.name.concat(", ", value.state);
                        setCurrentCity(selectedCity);
                      }}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option.name}, {option.state}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter Location"
                          // label="Enter Location"
                          //logic to update state when city is not in list
                          onChange={(event) => {
                            setCurrentCity(event.target.value);
                          }}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "off",
                            // autoComplete: "new-password",
                            // startAdornment: (
                            //   <InputAdornment position="start">
                            //     <IconButton edge="start">
                            //       <img src={currentLocationIcon} alt={"logo"} />
                            //     </IconButton>
                            //   </InputAdornment>
                            // ),
                          }}
                        />
                      )}
                    />
                  </div>
                </Stack>

                <Stack direction="row" className="stack-item">
                  <Typography class="textfieldHead">Destination</Typography>
                  <div className="location-wrap">
                    <img
                      src={destinationLocationIcon}
                      alt="logo"
                      className="icons"
                    />
                    <Autocomplete
                      className="location-input-field"
                      filterOptions={filterOptions}
                      value={destinationCity}
                      id="country-select-demo"
                      sx={{ width: "100%" }}
                      options={city}
                      autoHighlight
                      disableClearable
                      freeSolo
                      getOptionLabel={(option) =>
                        option.name || destinationCity
                      }
                      onChange={(event, value) => {
                        // console.log(value);
                        let selectedCity = value.name.concat(", ", value.state);
                        setDestinationCity(selectedCity);
                      }}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option.name}, {option.state}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter Location"
                          //label="Enter Location"
                          //logic to update state when city is not in list
                          onChange={(event) => {
                            setDestinationCity(event.target.value);
                          }}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "off",
                            // autoComplete: "new-password",
                            // startAdornment: (
                            //   <InputAdornment position="start">
                            //     <IconButton edge="start">
                            //       <img src={currentLocationIcon} alt={"logo"} />
                            //     </IconButton>
                            //   </InputAdornment>
                            // ),
                          }}
                        />
                      )}
                    />
                  </div>
                </Stack>

                <Stack direction="row" className="stack-item">
                  <Typography class="textfieldHead">Date</Typography>
                  <div className="date-wrap">
                    <img src={dateIcon} alt="logo" className="icons" />
                    <DatePicker
                      selected={date}
                      onChange={(date) => {
                        setDate(date);
                      }}
                      closeOnScroll={true}
                      dateFormat="dd/MM/yyyy"
                      minDate={subDays(new Date(), 0)}
                      className="date-picker"
                    />
                  </div>
                </Stack>

                <Stack direction="row" className="stack-item">
                  <Typography className="textfieldHead">Time</Typography>

                  <Select
                    id="demo-simple-select-helper"
                    variant="standard"
                    value={time}
                    onChange={(time) => setTime(time.target.value)}
                    sx={{
                      width: "185px",
                      backgroundColor: "white",
                    }}
                    className="input-field"
                  >
                    <MenuItem value="Any">
                      <>Any</>
                    </MenuItem>
                    <MenuItem value="Morning">Morning</MenuItem>
                    <MenuItem value="Afternoon">Afternoon</MenuItem>
                    <MenuItem value="Evening">Evening</MenuItem>
                    <MenuItem value="Night">Night</MenuItem>
                  </Select>
                </Stack>

                <Stack direction="row" className="stack-item">
                  <Typography className="textfieldHead">Mode</Typography>

                  <Select
                    id="demo-simple-select-helper"
                    variant="standard"
                    value={mode}
                    onChange={(mode) => setMode(mode.target.value)}
                    sx={{
                      width: "185px",
                      backgroundColor: "white",
                    }}
                    className="input-field"
                  >
                    <MenuItem value="Any">
                      <>Any</>
                    </MenuItem>
                    <MenuItem value="Personal Car">Personal Car</MenuItem>
                    <MenuItem value="Cab">Cab</MenuItem>
                    <MenuItem value="Train">Train</MenuItem>
                    <MenuItem value="Bus">Bus</MenuItem>
                    <MenuItem value="Flight">Flight</MenuItem>
                  </Select>
                </Stack>

                <Stack direction="row" className="stack-item">
                  <Typography className="textfieldHead">
                    Preffered Gender
                  </Typography>
                  <Select
                    id="demo-simple-select-helper"
                    variant="standard"
                    value={gender}
                    onChange={(gender) => setGender(gender.target.value)}
                    sx={{
                      width: "185px",
                      backgroundColor: "white",
                    }}
                    className="input-field"
                  >
                    <MenuItem value="Any">
                      <>Any</>
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </Stack>

                <Stack direction="row" className="stack-item">
                  <Typography className="textfieldHead">
                    No. of Passengers
                  </Typography>
                  <input
                    className="num-input"
                    type="number"
                    name="nop"
                    min={1}
                    value={nop}
                    onChange={(e) => {
                      setNop(e.target.value);
                    }}
                    required
                  />
                  <button className="text__icon">
                    <img
                      src={plus}
                      alt="locationIcon"
                      onClick={() => setNop(nop + 1)}
                    />
                  </button>
                  <button className="text__icon">
                    <img
                      src={minus}
                      alt="locationIcon"
                      onClick={() => {
                        if (nop - 1) setNop(nop - 1);
                      }}
                    />
                  </button>
                </Stack>
                <FormGroup>
                  <Stack direction="row" className="stack-item">
                    <Typography className="textfieldHead">
                      Description
                    </Typography>
                    <Box sx={{ width: "16rem" }} className="input-field ">
                      <FormControl>
                        <InputBase
                          varient="standard"
                          color="secondary"
                          multiline={true}
                          rows={3}
                          fullWidth
                          required
                          sx={{
                            backgroundColor: "white",
                            fontSize: "1rem",
                          }}
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                          className="description-field"
                        />
                      </FormControl>
                    </Box>
                  </Stack>
                </FormGroup>
              </FormControl>

              <Stack direction="row" className="btns-wrapper">
                <Button onClick={confirmSubmit} className="add-req-btn">
                  Add Request
                </Button>
                <Button onClick={makeDraft} className="draft-btn">
                  {draftSaved ? "Clear Draft " : "Draft"}
                </Button>
              </Stack>
            </Stack>
          </Container>

          <Box className="bg-container">
            <Box
              sx={{
                position: "absolute",
                bottom: "6rem",
                right: "5rem",
                width: {
                  xs: "300px",
                  md: "36vw",
                },
              }}
            >
              <img src={addReqBg} alt="illus" />
            </Box>
          </Box>
          <Box className="wave">
            <img src={wavesDesign} alt="illus" />
          </Box>
          <WebsiteInfo />

          <Container maxWidth="lg">
            <About />
            <MadeBy />
          </Container>
          <Footer />
        </div>
      ) : (
        <h1>Please log in first!</h1>
      )}
      <Toast />
    </Box>
  );
}

export default AddRequest;
