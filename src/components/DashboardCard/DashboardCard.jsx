import React, { useState, useEffect } from "react";
import "./DashboardCard.css";

function DashboardCard({
  currentCity,
  destinationCity,
  date,
  userId,
  nop,
  rideId,
}) {
  return (
    <div>
      <span>
        {currentCity.length > 20
          ? currentCity.slice(0, 20) + "..."
          : currentCity}
      </span>
      <span>
        {destinationCity.length > 20
          ? destinationCity.slice(0, 20) + "..."
          : destinationCity}
      </span>
      <span>{date}</span>
      <span>{nop}</span>
    </div>
  );
}

export default DashboardCard;
