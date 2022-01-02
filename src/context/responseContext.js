import React, { useState, createContext, useEffect } from "react";
import Card from "../components/Card/Card";
import { db } from "../firebase/db";
import { collection, query, onSnapshot } from "firebase/firestore";

export const ResponseContext = createContext();

const ResponseContextProvider = (props) => {
  const [response, setResponse] = useState([]);

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

  const loadData = async () => {
    const unsubscribe = onSnapshot(
      query(collection(db, "rides")),
      (querySnapshot) => {
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
              rideId={doc.id}
            />
          );
        });
        setResponse(x);
      }
    );
    return unsubscribe;
  };

  return (
    <ResponseContext.Provider value={[response, setResponse]}>
      {props.children}
    </ResponseContext.Provider>
  );
};

export default ResponseContextProvider;
