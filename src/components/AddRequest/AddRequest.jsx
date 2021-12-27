
import React, { useContext, useState, useRef, useEffect } from "react";
// import DatePicker from "@mui/lab/DatePicker";
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
import { v4 as uuidv4 } from "uuid";
import { Nav } from "../Nav/Nav";
import locationIcon from "../../resources/icons/locationIcon.svg";
import destinationIcon from "../../resources/icons/destinationIcon.svg";
import { About, MadeBy } from "../AboutUs/AboutUs";
import { Footer } from "../Footer/Footer";
import { WebsiteInfo } from "../../components/HomeComponents";
import city from "../../resources/states.json";

import {
  Box,
  Container,
  FormControl,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Select,
  MenuItem,
  InputBase,
} from "@mui/material";



// firebase
import { db } from "../../firebase/db";
import { collection, addDoc } from "firebase/firestore";

function AddRequest() {
  const [user] = useContext(UserContext);
  const [currentCity, setCurrentCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("Any");
  const [mode, setMode] = useState("Any");
  const [gender, setGender] = useState("Any");
  const [nop, setNop] = useState(1);
  const [description, setDescription] = useState("");

=
  const [cities, setCities] = useState(city);
  const [search, setSearch] = useState("");
  const [displaySources, setDisplaySources] = useState(false);
  const [displayDestinations, setDisplayDestinations] = useState(false);

  const localData = localStorage.getItem("user");
  const data = localData && JSON.parse(localData);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
    }
  });

  
    const formValidation = () => {
        if (currentCity && destinationCity && date && time && gender && nop && mode)
            return true;
        else
            return false;
    }
    useEffect(() => {
        if (!user.authorized) {
            alert("login first")
        }
    }, [user.authorized])


  const makeDraft = (e) => {
    e.preventDefault();
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
    localStorage.setItem("draft", JSON.stringify(draft));
  };

  const addRequest = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      if (window.confirm("Do yo want to continue?")) {
        setDate(date.setHours(0, 0, 0, 0));
        try {
          await addDoc(collection(db, "rides"), {
            currentCity,
            destinationCity,
            date,
            time,
            gender,
            nop,
            description,
            displayName: data.displayName,
            photoURL: data.photoURL,
            roomId: uuidv4(),
            userId: uid,
          });
          alert("Document written");

          setDate(new Date());
        } catch (e) {
          console.log("Error adding document: ", e);
        }
      }
    } else {
      alert("Please enter all the fields!");
    }
  };

  const handlelocationSelect = (type, v) => {
    if (type == "source") {
      setCurrentCity(v);
      setDisplaySources(false);
      setSearch("");
    } else {
      setDestinationCity(v);
      setDisplayDestinations(false);
      setSearch("");
    }
  };


  return user.authorized ? (
    <Box>
      <Container maxWidth="lg">
        <Nav />
      </Container>
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
              {displaySources ? (
                <div className="dataResult-source">
                  {cities
                    .filter((value) =>
                      value.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((value, key) => {
                      return (
                        <div
                          className="dataItem"
                          key={value.id}
                          onClick={() =>
                            handlelocationSelect("source", value.name)
                          }
                        >
                          <span>{value.name}</span>
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
                  onClick={() => setDisplayDestinations(!displayDestinations)}
                  className="location-input-field"
                  value={destinationCity}
                  onChange={(e) => {
                    setDestinationCity(e.target.value);
                    setSearch(e.target.value);
                  }}
                />
              </div>
              {displayDestinations ? (
                <div className="dataResult-destination">
                  {cities
                    .filter((value) =>
                      value.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((value, key) => {
                      return (
                        <div
                          className="dataItem"
                          key={value.id}
                          onClick={() =>
                            handlelocationSelect("destination", value.name)
                          }
                        >
                          <span>{value.name}</span>
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
            <Button onClick={addRequest} className="add-req-btn">
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
    </Box>
  ) : (
    <div>Not authorized to search</div>
  );
}

export default AddRequest;
