import React, { useContext, useState } from 'react'
import './NotificationCard.css';
import { UserContext } from '../../context/userContext';
import Loader from '../../components/Loader/Loader';

import { db } from '../../firebase/db';
import { updateDoc, doc } from "firebase/firestore";

function NotificationCard({ currentCity, destinationCity, displayName, photoURL, reqId }) {
    const [user] = useContext(UserContext);
    const [accepted, setAccepted] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAccept = async () => {
        setLoading(true);

        try {
            await updateDoc(doc(db, "users", user.uid, "requests", reqId), {
                status: "active"
            });
        }
        catch (err) {
            console.log("accept err : ", err)
        }
        setLoading(false);
        setAccepted(true);
    }

    const handleReject = async () => {
        setLoading(true);
        await updateDoc(doc(db, "users", user.uid, "requests", reqId), {
            status: "rejected"
        });
        setLoading(false);
        setRejected(true);
    }

    return (
        <div className="notification__card">
            <div className="img__conta">
                <img src={photoURL} alt="user-img" className="userPhoto" />
            </div>
            <div className="card__details">
                <p>{displayName}</p>
                <p>{currentCity} - {destinationCity}</p>
                {loading && <Loader size={20} />}
                {accepted ? <p style={{ color: 'green' }}>Request Accepted</p> : rejected ? <p style={{ color: 'red' }}>Request Rejected</p> : (
                    <div>
                        <button onClick={handleAccept}>Accept</button>
                        <button onClick={handleReject}>Reject</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NotificationCard