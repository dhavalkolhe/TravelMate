import React, { useEffect, useState, useContext } from "react";
import "./SearchResult.css";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchBox from "../../components/SearchBox/SearchBox";
import currentLocationIcon from "../../img/currentLocationIcon.svg";
import destinationLocationIcon from "../../img/destinationLocationIcon.svg";
import { Nav } from "../../components/Nav/Nav";
import { SearchContext } from "../../context/searchContext"

import { ResponseContext } from "../../context/responseContext";

import city from "../../resources/states.json";

import {
  Box,
  Container,
  Autocomplete,
  TextField,
  createFilterOptions,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterResultsNav from "../../components/FilterResultsNav/FilterResultsNav";

function SearchResult() {
  const [search, setSearch] = useContext(SearchContext);
  const {
    responseContext,
    //scrollContext, scrollResponseContext
  } = useContext(ResponseContext);
  const [response] = responseContext;
  // const [scroll, setScroll] = scrollContext;
  // const [scrollResponse, setScrollResponse] = scrollResponseContext;
  const [currentCity, setCurrentCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [gender, setGender] = useState("Any");
  const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
  const [endDate, setEndDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 6))
  );

  //+++
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [skeletonCount, setSkeletonCount] = useState(6);
  const [filteredResponse, setFilteredResponse] = useState();
  const [showFilterNav, setShowFilterNav] = useState(false);

  const handleFilterClick = () => {
    console.log("clicked");
    setShowFilterNav(true);
  };
  useEffect(() => {
    setCurrentCity(search.currentCity);
    setDestinationCity(search.destinationCity);
    setStartDate(search.startDate);
    setEndDate(search.endDate);
  }, [])

  //loading
  useEffect(() => {
    if (response) {
      setFilteredResponse(response);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    // eslint-disable-next-line
  }, [response]);

  useEffect(() => {
    let x = [];
    let y = [];
    let z = [];
    let g = [];

    x = response.filter(
      (response) =>
        new Date(response.props.date) >= new Date(startDate) &&
        new Date(response.props.date) <= new Date(endDate)
    );

    if (currentCity !== "" && x.length) {
      if (z.length == 0)
        y = x.filter((response) =>
          response.props.currentCity.includes(currentCity)
        );
      else
        y = z.filter((response) =>
          response.props.currentCity.includes(currentCity)
        );
    } else {
      y = [];
    }

    if (destinationCity !== "" && y.length) {
      if (y.length == 0) {
        z = x.filter((response) =>
          response.props.destinationCity.includes(destinationCity)
        );
      } else {
        z = y.filter((response) =>
          response.props.destinationCity.includes(destinationCity)
        );
      }
    } else {
      z = [];
    }

    if (gender && gender !== "Any") {
      if (z.length) {
        g = z.filter((response) => response.props.gender === gender);
      } else if (y.length) {
        g = y.filter((response) => response.props.gender === gender);
      } else if (x.length) {
        g = x.filter((response) => response.props.gender === gender);
      }
    } else {
      g = [];
    }

    g.length
      ? setFilteredResponse(g)
      : z.length
        ? setFilteredResponse(z)
        : y.length
          ? setFilteredResponse(y)
          : x.length
            ? setFilteredResponse(x)
            : setFilteredResponse([]);

    // eslint-disable-next-line
  }, [startDate, endDate, currentCity, destinationCity, gender]);

  const OPTIONS_LIMIT = 3;
  const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT,
  });

  return (
    <Box>
      <Container maxwidth="lg">
        <Nav />
        <div className="search__results">
          <h2 className="title">
            Search Results
            <span className="filter-icon-container">
              <FilterAltIcon
                sx={{ fontSize: 20 }}
                className="filter-icon"
                onClick={() => handleFilterClick()}
              />
              <span className="filter-text">Filter</span>
            </span>
          </h2>
          <div className="container">
            {showFilterNav ? (
              <FilterResultsNav
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                currentCity={currentCity}
                setCurrentCity={setCurrentCity}
                destinationCity={destinationCity}
                setDestinationCity={setDestinationCity}
                gender={gender}
                setGender={setGender}
                showFilterNav={showFilterNav}
                setShowFilterNav={setShowFilterNav}
              />
            ) : null}

            <div className="filter__results">
              <p className="secondary__title">Filter Results</p>
              <div>
                <h1 className="tertiary__title">Date</h1>
                <div className="row">
                  From
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
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
                        label="Enter Location"
                        //logic to update state when city is not in list
                        onChange={(event, value) => {
                          setCurrentCity(event.target.value);
                        }}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password",
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
                    filterOptions={filterOptions}
                    value={destinationCity}
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
                        label="Enter Location"
                        //logic to update state when city is not in list
                        onChange={(event, value) => {
                          setDestinationCity(event.target.value);
                        }}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password",
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
            </div>
            <div className="results">
              {loading ? (
                <SkeletonLoader skeletonCount={skeletonCount} />
              ) : (
                filteredResponse
              )}
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}

export default SearchResult;
