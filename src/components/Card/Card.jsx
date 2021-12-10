import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context/userContext';
import userIcon from '../../img/user.svg';
import currentLocationIcon from '../../img/currentLocationIcon.svg'
import destinationLocationIcon from '../../img/destinationLocationIcon.svg'
import dateIcon from '../../img/dateIcon.svg'
import arrow from '../../img/arrow.svg'
import './Card.css'
import Loader from '../../components/Loader/Loader';

import { db } from '../../firebase/db';
import { setDoc, getDoc, doc } from "firebase/firestore";

function Card({ currentCity, destinationCity, date, description, displayName, photoURL, roomId, userId, rideId }) {

    const [user] = useContext(UserContext);
    const [descHide, setDescHide] = useState(true);
    const [disable, setDisable] = useState(false);
    const [sendText, setSendText] = useState("Send Request");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (userId === user.uid) ? setDisable(true) : setDisable(false);
    }, [user, userId]);

    const reqExists = async () => {
        const docRef = doc(db, "users", userId, "requests", user.uid + "-" + rideId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return true;
        } else {
            return false;
        }
    }

    const addReq = async () => {
        await setDoc(doc(db, "users", userId, "requests", user.uid + "-" + rideId), {
            rideId,
            userId: user.uid,
            roomId,
            status: "pending"
        });
    }
    const sendRequest = () => {
        if (user.authorized) {
            setSendText("");
            setLoading(true);

            reqExists().then((res) => {
                if (res) {
                    setLoading(false);
                    setSendText("Request already sent ✅");
                    setDisable(true);
                } else {
                    try {
                        addReq();
                        setLoading(false);
                        setSendText("Request sent ✅");
                        setDisable(true);
                    } catch (e) {
                        console.error("Error sending req : ", e);
                    }
                }
            })
        } else {
            console.log("Not authorized");
        }
    }

    return (

        <div className="card__container">
            <div className="user__name">
                <i className="user__icon">
                    <img src={photoURL ? photoURL : userIcon} alt="user-icon" />
                </i>
                <span >{displayName ? displayName : "User Name"}</span>
            </div>
            <div className="user__data">
                <div>
                    <i className="card__icon">
                        <img src={currentLocationIcon} alt="currentLocationIcon" />
                    </i>
                    <span>
                        {currentCity.length > 20 ? currentCity.slice(0, 20) + "..." : currentCity}
                    </span>
                </div>
                <div>
                    <i className="card__icon">
                        <img src={destinationLocationIcon} alt="destinationLocationIcon" />
                    </i>
                    <span>
                        {destinationCity.length > 20 ? destinationCity.slice(0, 20) + "..." : destinationCity}
                    </span>
                </div>
                <div>
                    <i className="card__icon">
                        <img src={dateIcon} alt="dateIcon" />
                    </i>
                    <span>
                        {date}
                    </span>
                </div>
            </div>
            <button className="desc__btn"
                onClick={() => { setDescHide(!descHide) }}>
                Description
                <i className="arrow__icon">
                    <img src={arrow} alt="arrow" />
                </i>
            </button>
            <p className={descHide ? "desc__none" : "desc__display"}>
                {description ? description : <span style={{ color: "gray" }}>No description available</span>}
            </p>
            <div className="send__container">
                <button
                    className="send-btn blue__btn"
                    disabled={disable}
                    onClick={sendRequest}>
                    {sendText}
                    {loading && <Loader size={20} />}
                </button>
            </div >
        </div >
    )
}

export default Card
