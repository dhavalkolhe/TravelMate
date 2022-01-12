import React, { useState, useEffect, useContext } from "react";
import "./DashboardCard.css";
import rightArrow from "../../img/ArrowLong.svg";
import deleteIcon from "../../img/trashCan.svg";
import { db } from '../../firebase/db';
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { UserContext } from "../../context/userContext";

function DashboardCard({
  currentCity,
  destinationCity,
  date,
  nop,
  rideId }) {
  const [user] = useContext(UserContext);

  const deleteRide = async () => {
    try {
      await deleteDoc(doc(db, "rides", rideId));
      await updateDoc(doc(db, "users", user.uid), {
        rides: arrayRemove(rideId)
      });
    }
    catch (err) {
      console.log("Error in deleting : ", err.message)
    }
  }
  return (
    <div className="dashCardContainer">
      <div className="top-container">
        <span className="dashCity srcCity">
          {currentCity.length > 8
            ? currentCity.slice(0, 6) + "..."
            : currentCity}
        </span>
        <span>
          <img src={rightArrow} alt="arrow" />
        </span>
        <span className="dashCity desCity">
          {destinationCity.length > 8
            ? destinationCity.slice(0, 6) + "..."
            : destinationCity}
        </span>
        <span className="dashDeleteIcon" onClick={deleteRide}>
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
