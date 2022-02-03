import React, { useState, createContext, useEffect, useContext } from "react";
import { db } from "../firebase/db";
import { doc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { UserContext } from "./userContext";

export const SentReqContext = createContext();

const SentReqContextProvider = (props) => {
  const [user] = useContext(UserContext);
  const [sentReq, setSentReq] = useState([]);

  useEffect(() => {
    let unsub;
    if (user.authorized) {
      try {
        unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
          if (doc.data())
            if (doc.data().sentRequests)
              setSentReq((prev) => [...prev, ...doc.data().sentRequests]);
        });
      } catch (err) {
        console.log(err);
      }
    }

    return () => {
      if (unsub) unsub();
    };
  }, [user]);

  // useEffect(() => {
  //     if (sentReq.length !== 0)
  //         sentReq.forEach((e) => {
  //             console.log(e);
  //         })
  // }, [sentReq])

  return (
    <SentReqContext.Provider value={[sentReq, setSentReq]}>
      {props.children}
    </SentReqContext.Provider>
  );
};

export default SentReqContextProvider;
