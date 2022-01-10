//
//Active Offers are the ones user user created
//display offers created by user, use {userid} to fetch data of that user from db
//1. photoUrl
//2. userName
//3. useEmail
//4. Source city
//5. Destination city
//6. Date of travel
//7. No of passengers

import React, { useState, createContext, useEffect, useContext } from "react";
import { UserContext } from "./userContext";
import DashboardCard from "../components/DashboardCard/DashboardCard";

import { db } from "../firebase/db";
import { collection, query, orderBy, where } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { isEqual } from "date-fns/esm";

const auth = getAuth();

export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  const [activeOffers, setActiveOffers] = useState([]);
  const user = useContext(UserContext);

  let uid;

  useEffect(() => {
    let unsubscribe;
    try {
      loadData().then((res) => {
        unsubscribe = res;
      });
    } catch (err) {
      console.log("Response Fetching Error: " + err.message);
    }

    return () => {
      unsubscribe();
    };
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
      console.log(uid);
    } else {
      console.log("Not Authorised");
    }
  });

  const loadData = async () => {
    console.log("loading dash response");

    const q = query(
      collection(db, "rides"),
      orderBy("date", "asc"),
      where(
        "userId",
        "==",
        //uid goes here
        "l1WYdAL67NYUkMbYxinW8h6qLar1"
        //`${uid}`
      )
    );

    // const q = query(
    //   collection(db, "rides"),
    //   orderBy("date", "asc"),
    //   where(...sendData)
    // );

    //if not possible, other method is to fetch whole db and filter from it
    //or change db structure

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc, i) => {
        return (
          <DashboardCard
            key={Math.random(i + 1, 50 * i)}
            currentCity={doc.data().currentCity.split(",")[0]}
            destinationCity={doc.data().destinationCity.split(",")[0]}
            date={doc.data().date.toDate().toDateString()}
            userId={doc.data().userId}
            nop={doc.data().nop}
            rideId={doc.id}
          />
        );
      });
      setActiveOffers(x);
      console.log(x);
    });
    console.log("dash response loaded");
    return unsubscribe;
  };

  return (
    <DashboardContext.Provider value={activeOffers}>
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
