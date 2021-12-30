import React, { useEffect, useState, useContext } from "react";
import "./SearchResult.css";
import Loader from "../../components/Loader/Loader";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchBox from "../../components/SearchBox/SearchBox";
import currentLocationIcon from "../../img/currentLocationIcon.svg";
import destinationLocationIcon from "../../img/destinationLocationIcon.svg";
import { Nav } from "../../components/Nav/Nav";

import { ResponseContext } from "../../context/responseContext";

import { Box, Container } from "@mui/material";

function SearchResult() {
  const [response] = useContext(ResponseContext);
  const [currentCity, setCurrentCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [gender, setGender] = useState("Any");
  const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
  const [endDate, setEndDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 6))
  );

  const [loading, setLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(6);
  const [filteredResponse, setFilteredResponse] = useState();

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
      y = x.filter((response) =>
        response.props.currentCity.includes(currentCity)
      );
    } else {
      y = [];
    }

    if (destinationCity !== "" && y.length) {
      z = y.filter((response) =>
        response.props.destinationCity.includes(destinationCity)
      );
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

  return (
    <Box>
      <Container maxwidth="lg">
        <Nav />
        <div className="search__results">
          <h2 className="title">Search Results</h2>
          <div className="container">
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
                <h1 className="tertiary__title">Date</h1>
                <div className="row">
                  From
                  <SearchBox
                    imgSrc={currentLocationIcon}
                    inputName="currentLocation"
                    selectedCity={currentCity}
                    setSelectedCity={setCurrentCity}
                  />
                </div>

                <div className="row">
                  To
                  <SearchBox
                    imgSrc={destinationLocationIcon}
                    inputName="destinationCity"
                    selectedCity={destinationCity}
                    setSelectedCity={setDestinationCity}
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
