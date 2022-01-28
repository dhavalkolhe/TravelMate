import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import SearchBox from "../../components/SearchBox/SearchBox";
// import currentLocationIcon from "../../img/currentLocationIcon.svg";
// import destinationLocationIcon from "../../img/destinationLocationIcon.svg";

import CloseIcon from "@mui/icons-material/Close";
import "./FilterResultsNav.css";

import city from "../../resources/states.json";

import {
  Box,
  Autocomplete,
  TextField,
  createFilterOptions,
} from "@mui/material";

const FilterResultsNav = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  currentCity,
  setCurrentCity,
  destinationCity,
  setDestinationCity,
  gender,
  setGender,
  showFilterNav,
  setShowFilterNav,
}) => {
  // const filterRef = useRef(null);

  // useEffect(() => {
  //   const checkIfClickedOutside = (e) => {
  //     // If the menu is open and the clicked target is not within the menu,
  //     // then close the menu
  //     if (
  //       showFilterNav &&
  //       filterRef.current &&
  //       !filterRef.current.contains(e.target)
  //     ) {
  //       setShowFilterNav(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", checkIfClickedOutside);

  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener("mousedown", checkIfClickedOutside);
  //   };
  // }, [showFilterNav]);

  const OPTIONS_LIMIT = 3;
  const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT,
  });

  return (
    <div className="overlay">
      <div className="filter__results_nav ">
        <p className="secondary__title">
          Filter Results
          <span>
            <CloseIcon
              className="close-icon"
              onClick={() => {
                setShowFilterNav(false);
              }}
            />
          </span>
        </p>
        <div>
          <h1 className="tertiary__title">Date</h1>
          <div className="row">
            From
            <DatePicker
              selected={startDate} //
              onChange={(date) => {
                setStartDate(date);
              }} //
              minDate={new Date()}
              dateFormat="dd-MMM-yyyy"
              className="input"
            />
          </div>

          <div className="row">
            To
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={new Date()}
              dateFormat="dd-MMM-yyyy"
              className="input"
            />
          </div>
        </div>
        <div>
          <h1 className="tertiary__title">Location</h1>
          <div className="row">
            From
            <Autocomplete
              value={currentCity}
              filterOptions={filterOptions}
              id="country-select-demo"
              sx={{ width: "140px" }}
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
                  //logic to update state when city is not in list
                  onChange={(event, value) => {
                    setCurrentCity(event.target.value);
                  }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "off",
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

          <div className="row">
            To
            <Autocomplete
              value={destinationCity}
              filterOptions={filterOptions}
              id="country-select-demo"
              sx={{ width: "140px" }}
              options={city}
              autoHighlight
              disableClearable
              freeSolo
              getOptionLabel={(option) => option.name || destinationCity}
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
                  //logic to update state when city is not in list
                  onChange={(event, value) => {
                    setDestinationCity(event.target.value);
                  }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "off",
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
            ;
          </div>
        </div>

        <div>
          <h1 className="tertiary__title">Preferred Gender</h1>
          <div className="row">
            <select
              name="gender"
              required
              defaultValue={gender}
              onChange={(gender) => setGender(gender.target.value)}
              className="input"
            >
              <option value="Any">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        {/* <Button onClick={() => setShowFilterNav(false)}>Show Results</Button> */}
      </div>
    </div>
  );
};

export default FilterResultsNav;
