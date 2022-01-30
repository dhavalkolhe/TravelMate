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
  getDocs, collection
} from "firebase/firestore";
import { UserContext } from "../../context/userContext";
import Toast from "../Toast/Toast";
import { toast } from "react-toastify";


function DashboardCard({ currentCity, destinationCity, date, nop, rideId }) {
  const [user] = useContext(UserContext);
  let tid;

  const catchError = (err) => {
    console.log("Error in deleting : ", err.message);
    toast.update(tid, { render: "Failed to delete ride!", type: "error", isLoading: false, autoClose: 1000 });
  };
  //Toast Function
  // const notify = (type, message) => {
  //   toast[type](message);
  // };
  const delRequests = async (reqId) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "requests", reqId));
      console.log("deleted req from user req db");

    } catch (error) {
      catchError(error)
    }
  };

  const delRooms = async (roomId) => {
    try {
      const roomSnap = await getDoc(doc(db, "rooms", roomId));
      if (roomSnap.data().members.length > 0)
        roomSnap.data().members.forEach(async (uid) => {
          await updateDoc(doc(db, "users", uid), {
            rooms: arrayRemove(roomId),
          });
        })

      const snapshot = await getDocs(collection(db, "rooms", roomId, "messages"));
      snapshot.forEach(async (msg) => {
        await deleteDoc(doc(db, "rooms", roomId, "messages", msg.id));
      })
      await deleteDoc(doc(db, "rooms", roomId));
      console.log("deleted room from room db");
    } catch (error) {
      catchError(error)
    }
  };

  const deleteAllRideMisc = async () => {
    try {
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
      return deleteDoc(doc(db, "users", user.uid, "rides", rideId));
    } catch (error) {
      catchError(error)
    }
  };
  const deleteRide = () => {
    tid = toast.loading("Please wait...")
    toast.update(tid, { render: "Deleting Ride..", type: "pending", isLoading: true });

    deleteDoc(doc(db, "rides", rideId))
      .then(() => {
        console.log("deleted ride from ride db");
        return updateDoc(doc(db, "users", user.uid), {
          rides: arrayRemove(rideId),
        })
      })
      .then(() => {
        console.log("deleted ride arr from user db");
        return deleteAllRideMisc()
      })
      .then(() => {
        console.log("deleted ride collection from user db");
        toast.update(tid, { render: "Ride Deleted", type: "success", isLoading: false, autoClose: 1500 });

      })
      .catch((err) => {
        catchError(err);
      })
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
