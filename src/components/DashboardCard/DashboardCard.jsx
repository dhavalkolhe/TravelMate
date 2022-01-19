import React, { useContext } from "react";
import "./DashboardCard.css";
import rightArrow from "../../img/ArrowLong.svg";
import deleteIcon from "../../img/trashCan.svg";
import { db } from "../../firebase/db";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { UserContext } from "../../context/userContext";
import Toast from "../Toast/Toast";
import { toast } from "react-toastify";


function DashboardCard({ currentCity, destinationCity, date, nop, rideId }) {
  const [user] = useContext(UserContext);

  //Toast Function
  const notify = (type, message) => {
    toast[type](message);
  };
  const delRequests = async (reqId) => {
    await deleteDoc(doc(db, "users", user.uid, "requests", reqId));

  };

  const delRooms = async (roomId) => {
    await deleteDoc(doc(db, "rooms", roomId));
  };

  const deleteAllRideMisc = async () => {
    const userRideRef = doc(db, "users", user.uid, "rides", rideId);
    const d = await getDoc(userRideRef);

    if (d.exists()) {
      const reqArr = d.data().requests;
      const roomArr = d.data().rooms;
      reqArr.forEach((req) => {
        delRequests(req);
      });
      roomArr.forEach((room) => {
        delRooms(room);
      });
    }
    await deleteDoc(doc(db, "users", user.uid, "rides", rideId));
    notify("success", "Ride Deleted");
  };

  const deleteRide = async () => {

    try {
      await deleteDoc(doc(db, "rides", rideId));
      await updateDoc(doc(db, "users", user.uid), {
        rides: arrayRemove(rideId),
      });
      deleteAllRideMisc();
    } catch (err) {
      console.log("Error in deleting : ", err.message);
      notify("error", "Ride Deletion Failed");
    }
  };

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
      <Toast />
    </div>
  );
}

export default DashboardCard;
