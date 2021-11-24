import React, { useEffect, useState } from 'react'
import './SearchResult.css'
import { db } from '../../firebase/db';
import { collection, getDocs } from "firebase/firestore";
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
// import { where, query } from "firebase/firestore";

function SearchResult() {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadData = async () => {
        // let start = new Date('2021-11-01');
        // let end = new Date('2021-11-31');

        const querySnapshot = await getDocs(collection(db, "rides"));
        // const q = query(querySnapshot, where("date", ">", end));

        const x = querySnapshot.docs.map((doc, i) => {
            return <Card
                key={i}
                currentCity={doc.data().currentCity}
                destinationCity={doc.data().destinationCity}
                date={doc.data().date.toDate().toDateString()}
                description={doc.data().description}
                displayName={doc.data().displayName}
                photoURL={doc.data().photoURL}
            />
        });
        setLoading(false);
        setResult(x);
    }

    return (
        <div className="search__results">
            <h2 className="title">Search Results</h2>
            <div className="container">
                <div className="filter__results">
                    <p className="secondary__title">Filter Results</p>
                </div>
                <div className="results">
                    {loading && <Loader />}
                    {result}
                </div>
            </div>
        </div>
    )
}

export default SearchResult
