import React from 'react'
import { Link } from 'react-router-dom';

function ChatCard({ currentCity, destinationCity, displayName, photoURL, reqId, roomId }) {
    return (
        <Link to={`/chat/${roomId}`} >
            <div className="notification__card">
                <div className="img__conta">
                    <img src={photoURL} alt="user-img" className="userPhoto" />
                </div>
                <div className="card__details">
                    <p>{displayName}</p>
                    <p>{currentCity} - {destinationCity}</p>
                </div>
            </div>
        </Link >
    )
}

export default ChatCard
