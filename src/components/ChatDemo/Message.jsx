import React, { useContext, useState, useEffect } from 'react'
import './Chat.css'
import { UserContext } from '../../context/userContext';
import { db } from "../../firebase/db";
import { doc, setDoc, updateDoc, increment, deleteDoc } from "firebase/firestore";
// import { v4 as uuidv4 } from 'uuid';

export default function Message({ messageContent, roomId }) {
    const [user] = useContext(UserContext);
    const [saved, setSaved] = useState(false);
    const [savedStyle, setSavedStyle] = useState("");
    delete messageContent.room;

    useEffect(() => {
        if (saved) {
            setSavedStyle("saved");
        } else {
            setSavedStyle("");
        }
    }, [saved])

    const handleClick = (e) => {
        if (saved) {
            e.target.style.removeProperty("background-color")
            deleteMessage(messageContent)
        } else {
            e.target.style.backgroundColor = "black";
            saveMessage(messageContent)
        }
        setSaved(!saved);
    }


    const saveMessage = async (messageData) => {
        try {
            await setDoc(doc(db, "rooms", roomId, "messages", messageData.msgId), messageData)
            await updateDoc(doc(db, "rooms", roomId), {
                limit: increment(-1)
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    const deleteMessage = async (messageData) => {
        try {
            await deleteDoc(doc(db, "rooms", roomId, "messages", messageData.msgId), messageData)
            await updateDoc(doc(db, "rooms", roomId), {
                limit: increment(1)
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div
            className="message"
            id={user.uid === messageContent.uid ? "you" : "other"}
        >
            <div onClick={(e) => { handleClick(e) }}
                className={`${savedStyle}`}>
                <div className={`message-content`} id="message-content">
                    <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                    <p id="time">{new Date(messageContent.time).getHours() +
                        ":" +
                        new Date(messageContent.time).getMinutes()}</p>
                    <p id="author">{messageContent.author}</p>
                </div>
            </div>
        </div >
    )
}
