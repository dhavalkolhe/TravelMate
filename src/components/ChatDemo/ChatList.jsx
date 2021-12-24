import React, { useEffect, useState, useContext } from 'react'
import { RoomsContext } from '../../context/roomsContext';
import ChatCard from './ChatCard';
import Loader from '../../components/Loader/Loader';

import './ChatList.css'

function ChatList() {
    const { roomData, loading } = useContext(RoomsContext);
    const [roomsData] = roomData;
    const [roomLoading] = loading;

    const [cardData, setCardData] = useState([]);
    const [chatsCount, setChatsCount] = useState(0);

    useEffect(() => {
        if (roomsData.length) {
            const x = roomsData.map((room, i) => {
                return (
                    <ChatCard
                        key={i}
                        currentCity={room.currentCity}
                        destinationCity={room.destinationCity}
                        displayName={room.displayName}
                        photoURL={room.photoURL}
                        reqId={room.reqId}
                        roomId={room.roomId}
                    />
                )
            })

            setCardData(x);
            setChatsCount(x.length);
        }
    }, [roomsData])

    return (
        <div className="sidebar">
            <div>
                ChatList: {chatsCount}
                {roomLoading ? <Loader /> : (
                    <div>
                        {chatsCount ? cardData : <p>No Chats!</p>}
                    </div>
                )}
                {/* {loading && <Loader />} */}
            </div>
        </div>
    )
}

export default ChatList
