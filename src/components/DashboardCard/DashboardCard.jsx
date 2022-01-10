import React, { useState, useEffect } from "react";
import "./DashboardCard.css";
import rightArrow from "../../img/ArrowLong.svg";
import deleteIcon from "../../img/trashCan.svg";
import dottedLine from "../../img/dottedLine.svg";

function DashboardCard({
  currentCity,
  destinationCity,
  date,
  userId,
  nop,
  rideId,
}) {
  return (
    <div className="dashCardContainer">
      <div className="top-container">
        <span className="dashCity srcCity">
          {currentCity.length > 20
            ? currentCity.slice(0, 20) + "..."
            : currentCity}
        </span>
        <span>
          <img src={rightArrow} alt="arrow" />
        </span>
        <span className="dashCity desCity">
          {destinationCity.length > 20
            ? destinationCity.slice(0, 20) + "..."
            : destinationCity}
        </span>
        <span className="dashDeleteIcon">
          <img src={deleteIcon} alt="delete-icon" />
        </span>
      </div>
      <hr />
      <div className="bottom-container">
        <span className="date-container">{date}</span>
        <span className="nop-container">Passengers: {nop}</span>
      </div>
    </div>
  );
}

export default DashboardCard;
