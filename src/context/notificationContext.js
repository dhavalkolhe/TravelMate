import React, { useEffect, useState, useContext, createContext } from "react";
import { UserContext } from "./userContext";

import { db } from "../firebase/db";
import { doc, onSnapshot, getDoc, collection } from "firebase/firestore";

export const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
  const [user] = useContext(UserContext);
  const [notificationData, setNotificationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.authorized) {
      fetchData();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // useEffect(() => {
  //   console.log(notificationData)
  // }, [notificationData])

  const fetchData = async () => {
    const unsub = onSnapshot(
      collection(db, "users", user.uid, "requests"),
      (recievedReqSnap) => {
        recievedReqSnap.docChanges().forEach(
          (change) => {
            if (change.type === "added") {
              let masterObj = {
                reqId: change.doc.id,
                status: change.doc.data().status,
                roomId: change.doc.data().roomId,
              };

              fetchRequestorData(change.doc.data().requestorId)
                .then((res) => {
                  masterObj = { ...masterObj, ...res };
                })
                .then(() => {
                  fetchRideData(change.doc.data().rideId)
                    .then((res) => {
                      masterObj = { ...masterObj, ...res };
                    })
                    .then(() => {
                      setNotificationData((prev) => [...prev, masterObj]);
                    });
                });
            }
          },
          (err) => {
            console.log("notification data err : ", err);
          }
        );
      }
    );
    return unsub;
  };

  const fetchRideData = async (rideId) => {
    const rideData = await getDoc(doc(db, "rides", rideId));
    if (rideData)
      return {
        rideId: rideId,
        currentCity: rideData.data().currentCity,
        destinationCity: rideData.data().destinationCity,
      };
  };

  const fetchRequestorData = async (requestorId) => {
    const requestorData = await getDoc(doc(db, "users", requestorId));
    return {
      requestorId: requestorId,
      displayName: requestorData.data().displayName,
      photoURL: requestorData.data().photoURL,
    };
  };

  return (
    <NotificationContext.Provider
      value={{
        noti: [notificationData, setNotificationData],
        load: [loading, setLoading],
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
