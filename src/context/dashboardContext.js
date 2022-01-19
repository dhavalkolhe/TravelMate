import React, { useState, createContext, useEffect, useContext } from "react";
import { UserContext } from "./userContext";
import DashboardCard from "../components/DashboardCard/DashboardCard";

import { db } from "../firebase/db";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  const [activeOffers, setActiveOffers] = useState([]);
  const [user] = useContext(UserContext);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        let uid = user.uid;
      } else {
        console.log("Not Authorised");
      }
    });

    try {
      fetchData();
    } catch (err) {
      console.log("Response Fetching Error: " + err.message);
    }
    return () => {
      unsub();
    };
  }, []);

  const fetchData = () => {
    let activeRides = [];

    onSnapshot(
      doc(db, "users", user.uid),
      { includeMetadataChanges: false },
      (recievedReqSnap) => {
        activeRides = [];
        if (recievedReqSnap.data().rides.length) {
          recievedReqSnap.data().rides.forEach((rideId) => {
            fetchRideData(rideId)
              .then((response) => {
                activeRides.push(response);
              })
              .then(() => {
                const x = activeRides.map((doc, i) => {
                  return (
                    <DashboardCard
                      key={Math.random(i + 1, 50 * i)}
                      currentCity={doc.currentCity.split(",")[0]}
                      destinationCity={doc.destinationCity.split(",")[0]}
                      date={doc.date}
                      nop={doc.nop}
                      rideId={doc.rideId}
                    />
                  );
                });
                setActiveOffers(x);
              });
          });
        }
        //  else if (recievedReqSnap.data().rides.length === 0) {
        //   setRideLoading(false);
        // }
      }
    );
  };

  const fetchRideData = async (rideId) => {
    const rideData = await getDoc(doc(db, "rides", rideId));
    return {
      currentCity: rideData.data().currentCity,
      destinationCity: rideData.data().destinationCity,
      date: rideData.data().date.toDate().toDateString(),
      nop: rideData.data().nop,
      rideId,
    };
  };

  return (
    <DashboardContext.Provider value={activeOffers}>
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
