import React, { useEffect, useState, useContext, createContext } from "react";
import { UserContext } from "./userContext";

import { db } from "../firebase/db";
import { doc, onSnapshot, getDoc, collection } from "firebase/firestore";
// import NotificationCard from './NotificationCard';

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
  //     console.log(notificationData)
  // }, [notificationData])

  const fetchData = () => {
    setNotificationData([]);

    onSnapshot(
      collection(db, "users", user.uid, "requests"),
      (recievedReqSnap) => {
        recievedReqSnap.docChanges().forEach(
          (change) => {
            // console.log(change)
            if (change.type === "added") {
              console.log("Added :", change.doc.data());

              let masterObj = {
                reqId: change.doc.id,
                status: change.doc.data().status,
              };

              fetchRequestorData(change.doc.data().userId)
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
            if (change.type === "modified") {
              console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
              console.log("Removed city: ", change.doc.data());
            }
          },
          (err) => {
            console.log("updation err : ", err);
          }
        );
        // recievedReqSnap.forEach((eachReq) => {

        //     let masterObj = { reqId: eachReq.id, status: eachReq.data().status };

        //     fetchRequestorData(eachReq.data().userId).then(res => {
        //         masterObj = { ...masterObj, ...res };
        //     }).then(() => {
        //         fetchRideData(eachReq.data().rideId).then((res) => {
        //             masterObj = { ...masterObj, ...res };
        //         }).then(() => {
        //             setNotificationData((prev) => ([...prev, masterObj]))
        //         })
        //     })
        // })
      }
    );
  };

  const fetchRideData = async (rideId) => {
    const rideData = await getDoc(doc(db, "rides", rideId));
    return {
      currentCity: rideData.data().currentCity,
      destinationCity: rideData.data().destinationCity,
    };
  };

  const fetchRequestorData = async (userId) => {
    const requestorData = await getDoc(doc(db, "users", userId));
    return {
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
