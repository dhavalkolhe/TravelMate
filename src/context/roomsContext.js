import React, { useEffect, useState, useContext, createContext } from "react";
import { UserContext } from "./userContext";

import { db } from "../firebase/db";
import {
  doc,
  onSnapshot,
  getDoc,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";

export const RoomsContext = createContext();

const RoomsContextProvider = (props) => {
  const [user] = useContext(UserContext);
  const [roomData, setRoomData] = useState([]);
  const [roomLoading, setRoomLoading] = useState(true);

  useEffect(() => {
    let unsub;
    if (user.authorized) {
      try {
        fetchData().then((res) => {
          unsub = res;
        });
        setTimeout(() => {
          setRoomLoading(false);
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    }
    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // useEffect(() => {
  //     console.log(roomData)
  // }, [roomData])

  const fetchData = async () => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (recievedReqSnap) => {
      if (recievedReqSnap.data().rooms.length) {
        recievedReqSnap.data().rooms.forEach((roomId) => {
          fetchRoomData(roomId);
        });
      } else if (recievedReqSnap.data().rooms.length === 0) {
        setRoomLoading(false);
      }
    });
    return unsub;
  };

  const fetchRoomData = async (roomId) => {
    const roomData = await getDoc(doc(db, "rooms", roomId));
    if (roomData.exists()) {
      let index = 0;
      if (roomData.data().members[0] === user.uid) index = 1;
      let masterObj = {
        roomId: roomData.id,
      };

      fetchMemData(roomData.data().members[index])
        .then((memData) => {
          masterObj = { ...masterObj, ...memData };
        })
        .then(() => {
          fetchRideData(roomData.data().rideId)
            .then((rideData) => {
              masterObj = { ...masterObj, ...rideData };
            })
            .then(() => {
              setRoomData((prev) => [...prev, masterObj]);
            });
        });
    } else {
      await updateDoc(doc(db, "users", user.uid), {
        rooms: arrayRemove(roomId),
      });
    }
  };

  const fetchMemData = async (memId) => {
    const memData = await getDoc(doc(db, "users", memId));
    return {
      memId,
      displayName: memData.data().displayName,
      photoURL: memData.data().photoURL,
    };
  };

  const fetchRideData = async (rideId) => {
    const rideData = await getDoc(doc(db, "rides", rideId));
    return {
      rideId,
      currentCity: rideData.data().currentCity,
      destinationCity: rideData.data().destinationCity,
    };
  };

  return (
    <RoomsContext.Provider
      value={{
        roomData: [roomData, setRoomData],
        loading: [roomLoading, setRoomLoading],
      }}
    >
      {props.children}
    </RoomsContext.Provider>
  );
};

export default RoomsContextProvider;
