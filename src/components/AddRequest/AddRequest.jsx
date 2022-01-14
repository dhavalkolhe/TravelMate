import React, { useContext, useState, useRef, useEffect } from "react";
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
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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

  let draftData;
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

  const [user] = useContext(UserContext);
  const [currentCity, setCurrentCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("Any");
  const [mode, setMode] = useState("Any");
  const [gender, setGender] = useState("Any");
  const [nop, setNop] = useState(1);
  const [description, setDescription] = useState("");

  const [cities, setCities] = useState(city);
  const [search, setSearch] = useState("");
  const [displaySources, setDisplaySources] = useState(false);
  const [displayDestinations, setDisplayDestinations] = useState(false);

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
              {
                addRequest();
              }
            },
          },
          {
            label: "No",
            className: "noButton",
            onClick: () => alert("Cancelled"),
          },
        ],
      });
    } else {
      alert("Please enter all the fields!");
    }
  };

  // ////////////////////////////
  const addRequest = async (e) => {
    console.log("Add Request called");

    setDate(date.setHours(0, 0, 0, 0));
    try {
      let docref = await addDoc(collection(db, "rides"), {
        currentCity,
        destinationCity,
        date,
        time,
        gender,
        nop,
        description,
        displayName: user.displayName,
        photoURL: user.photoURL,
        userId: user.uid,
      });

      updateUserRides1(docref.id);
      updateUserRides2(docref.id);
      alert("Document written");

      setDate(new Date());
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  const handlelocationSelect = (type, v, v1) => {
    const selectedCity = v.concat(", ", v1);
    if (type == "source") {
      setCurrentCity(selectedCity);
      setDisplaySources(false);
      setSearch("");
    } else {
      setDestinationCity(selectedCity);
      setDisplayDestinations(false);
      setSearch("");
    }
  };

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
                      className="date-icon"
                    />
                    <input
                      placeholder="Location"
                      onClick={() => setDisplaySources(!displaySources)}
                      className="location-input-field"
                      value={currentCity}
                      onChange={(e) => {
                        setCurrentCity(e.target.value);
                        setSearch(e.target.value);
                      }}
                    />
                  </div>
                  {displaySources && search ? (
                    <div className="dataResult-source">
                      {cities
                        .filter((value) =>
                          value.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                        .map((value, key) => {
                          return (
                            <div
                              className="dataItem"
                              key={value.id}
                              onClick={() =>
                                handlelocationSelect(
                                  "source",
                                  value.name,
                                  value.state
                                )
                              }
                            >
                              <span className="no-text-wrap">
                                {value.name}, {value.state}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  ) : null}
                </Stack>

                <Stack direction="row" className="stack-item">
                  <Typography class="textfieldHead">Destination</Typography>
                  <div className="location-wrap">
                    <img
                      src={destinationLocationIcon}
                      alt="logo"
                      className="date-icon"
                    />
                    <input
                      placeholder="Location"
                      onClick={() =>
                        setDisplayDestinations(!displayDestinations)
                      }
                      className="location-input-field"
                      value={destinationCity}
                      onChange={(e) => {
                        setDestinationCity(e.target.value);
                        setSearch(e.target.value);
                      }}
                    />
                  </div>
                  {displayDestinations && search ? (
                    <div className="dataResult-destination">
                      {cities
                        .filter((value) =>
                          value.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                        .map((value, key) => {
                          return (
                            <div
                              className="dataItem"
                              key={value.id}
                              onClick={() =>
                                handlelocationSelect(
                                  "destination",
                                  value.name,
                                  value.state
                                )
                              }
                            >
                              <span className="no-text-wrap">
                                {value.name}, {value.state}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  ) : null}
                </Stack>

                <Stack direction="row" className="stack-item">
                  <Typography class="textfieldHead">Date</Typography>
                  <div className="date-wrap">
                    <img src={dateIcon} alt="logo" className="date-icon" />
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

                <Stack direction="row" className="stack-item">
                  <Typography className="textfieldHead">Description</Typography>
                  <Box sx={{ width: "16rem" }} className="input-field ">
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
                    ></InputBase>
                  </Box>
                </Stack>
              </FormControl>

              <Stack direction="row" className="btns-wrapper">
                <Button onClick={confirmSubmit} className="add-req-btn">
                  Add Request
                </Button>
                <Button onClick={makeDraft} className="draft-btn">
                  Draft
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
    </Box>
  );
}

export default AddRequest;
