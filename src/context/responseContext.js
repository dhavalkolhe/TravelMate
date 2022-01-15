import React, { useState, createContext, useEffect } from "react";
import Card from "../components/Card/Card";
import { db } from "../firebase/db";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

export const ResponseContext = createContext();

const ResponseContextProvider = (props) => {
  const [response, setResponse] = useState([]);

  /////lazy loading
  const [scroll, setScroll] = useState(true);
  const [scrollResponse, setScrollResponse] = useState();
  const [lastCard, setLastCard] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

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
  }, [scroll]);

  const loadData = async () => {
    console.log("Loading response... ");
    const q = query(
      collection(db, "rides"),
      orderBy("date", "asc"),
      limit(20),
      startAfter(lastCard)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const isCollectionEmpty = querySnapshot.size === 0;
      if (!isCollectionEmpty) {
        const x = querySnapshot.docs.map((doc, i) => {
          return (
            <Card
              key={Math.random(i + 1, 50 * i)}
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

        const lastCard = querySnapshot.docs[querySnapshot.docs.length - 1];
        const y = [...response, ...x];
        setResponse((response) => [...new Set(y)]);
        setLastCard(lastCard);
        setScrollResponse(false);
      } else {
        setIsEmpty(true);
        //To display something when collection is emtpy
        //Set isEmpty in global context and use it in SearchResults to display accordingly.
      }

      //keeping track of lastCard and updating response state
    });
    console.log("Response loaded.");
    return unsubscribe;
  };

  return (
    <ResponseContext.Provider
      value={{
        responseContext: [response, setResponse],
        scrollContext: [scroll, setScroll],
        scrollResponseContext: [scrollResponse, setScrollResponse],
      }}
    >
      {props.children}
    </ResponseContext.Provider>
  );
};

export default ResponseContextProvider;
