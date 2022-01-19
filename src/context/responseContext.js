import React, { useState, createContext, useEffect } from "react";
import Card from "../components/Card/Card";
import { db } from "../firebase/db";
import { collection, query, orderBy } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

export const ResponseContext = createContext();

const ResponseContextProvider = (props) => {
  const [response, setResponse] = useState([]);

  /////lazy loading
  // const [scroll, setScroll] = useState(true);
  // const [scrollResponse, setScrollResponse] = useState();
  // const [lastCard, setLastCard] = useState(null);
  // const [isEmpty, setIsEmpty] = useState(false);

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
    console.log("Loading response... ");
    const q = query(
      collection(db, "rides"),
      orderBy("date", "asc")
      // limit(20),
      // startAfter(lastCard)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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

      // const lastCard = querySnapshot.docs[querySnapshot.docs.length - 1];
      const y = [...response, ...x];
      setResponse((response) => [...new Set(y)]);
      // setLastCard(lastCard);
      // setScrollResponse(false);

      //keeping track of lastCard and updating response state
    });
    console.log("Response loaded.");
    return unsubscribe;
  };

  return (
    <ResponseContext.Provider
      value={{
        responseContext: [response, setResponse],
        // scrollContext: [scroll, setScroll],
        // scrollResponseContext: [scrollResponse, setScrollResponse],
      }}
    >
      {props.children}
    </ResponseContext.Provider>
  );
};

export default ResponseContextProvider;
