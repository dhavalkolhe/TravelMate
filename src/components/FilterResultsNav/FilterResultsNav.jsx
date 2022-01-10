import React, { useEffect, useState, useContext, useRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchBox from "../../components/SearchBox/SearchBox";
import currentLocationIcon from "../../img/currentLocationIcon.svg";
import destinationLocationIcon from "../../img/destinationLocationIcon.svg";

import { Button } from "@mui/material";
import "./FilterResultsNav.css";

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
  const filterRef = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        showFilterNav &&
        filterRef.current &&
        !filterRef.current.contains(e.target)
      ) {
        setShowFilterNav(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showFilterNav]);

  return (
    <div className="overlay">
      <div ref={filterRef} className="filter__results_nav ">
        <p className="secondary__title">Filter Results</p>
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
        {/* <Button onClick={() => setShowFilterNav(false)}>Show Results</Button> */}
      </div>
    </div>
  );
};

export default FilterResultsNav;
