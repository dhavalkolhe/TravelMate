import React, { useContext, useState } from 'react'
import './NotificationCard.css';
import { UserContext } from '../../context/userContext';
import Loader from '../../components/Loader/Loader';
import { v4 as uuidv4 } from 'uuid';

import { db } from '../../firebase/db';
import { updateDoc, doc, setDoc, arrayUnion, deleteDoc } from "firebase/firestore";

function NotificationCard({ currentCity, destinationCity, displayName, photoURL, reqId, requestorId, rideId }) {
    const [user] = useContext(UserContext);
    const [accepted, setAccepted] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [loading, setLoading] = useState(false);

    const createChatRoom = async (roomId) => {
        await setDoc(doc(db, "rooms", roomId), {
            members: [user.uid, requestorId],
            rideId: rideId,
            limit: 50
        });
    }
    const updateUserRideRooms = async (roomId) => {
        const userRideRef = doc(db, "users", user.uid, "rides", rideId);
        await updateDoc(userRideRef, {
            rooms: arrayUnion(roomId)
        });
    }
    const updateUserRooms = async (roomId) => {
        const userRoomRef = doc(db, "users", user.uid);
        await updateDoc(userRoomRef, {
            rooms: arrayUnion(roomId)
        });

        const requestorRoomRef = doc(db, "users", requestorId);
        await updateDoc(requestorRoomRef, {
            rooms: arrayUnion(roomId)
        });
    }
    const handleAccept = async () => {
        setLoading(true);
        let roomId = uuidv4();

        try {
            await updateDoc(doc(db, "users", user.uid, "requests", reqId), {
                status: "active",
                roomId
            });
            createChatRoom(roomId);
            updateUserRooms(roomId);
            updateUserRideRooms(roomId);
        }
        catch (err) {
            console.log("accept err : ", err)
        }
        setLoading(false);
        setAccepted(true);
    }

    const handleReject = async () => {
        setLoading(true);
        await deleteDoc(doc(db, "users", user.uid, "requests", reqId));

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