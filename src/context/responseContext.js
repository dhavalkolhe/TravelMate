import React, { useState, createContext, useEffect } from "react";
import Card from "../components/Card/Card";
import { db } from "../firebase/db";
import { collection, query } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

export const ResponseContext = createContext();

const ResponseContextProvider = (props) => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    let unsubscribe;
    loadData().then((res) => {
      unsubscribe = res;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      unsubscribe();
    };
  }, []);

  const loadData = async () => {
    console.log("Loading response... ");
    const q = query(collection(db, "rides"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc, i) => {
        return (
          <Card
            key={i}
            currentCity={doc.data().currentCity}
            destinationCity={doc.data().destinationCity}
            date={doc.data().date.toDate().toDateString()}
            description={doc.data().description}
            displayName={doc.data().displayName}
            photoURL={doc.data().photoURL}
            userId={doc.data().userId}
            gender={doc.data().gender}
            nop={doc.data().nop}
            rideId={doc.id}
          />
        );
      });
      setResponse(x);
    });
    console.log("Response loaded.");
    return unsubscribe;
  };

  return (
    <ResponseContext.Provider value={[response, setResponse]}>
      {props.children}
    </ResponseContext.Provider>
  );
};

export default ResponseContextProvider;
