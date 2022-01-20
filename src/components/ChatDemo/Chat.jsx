import React, { useEffect, useState, useContext } from "react"
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client"
import './Chat.css'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

import { db } from "../../firebase/db";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import Message from "./Message";

const socket = io(process.env.REACT_APP_BACKEND_URL, {
    transports: ['websocket', 'polling', 'flashsocket'],
    SameSite: 'None'
});



function Chat() {
    const [user] = useContext(UserContext);
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [joined, setJoined] = useState(true);
    const { roomId } = useParams();

    useEffect(() => {
        isMemberOf().then((res) => {
            if (res) {
                try {
                    const unsub = socket.emit("join_room", roomId);
                    setJoined(true);
                    return unsub;
                }
                catch (err) {
                    console.log(err)
                }
            } else {
                setJoined(false);
            }
        })
        //eslint-disable-next-line
    }, [roomId])

    useEffect(() => {
        fetchSavedMessages().then((masterArr) => {
            console.log(masterArr);
            setMessageList(masterArr)
        })
        //eslint-disable-next-line
    }, [])

    const fetchSavedMessages = async () => {
        let masterArr = [];
        const q = collection(db, "rooms", roomId, "messages");

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            masterArr.push({ ...doc.data(), time: doc.data().time.toDate() });
        });
        return masterArr;
    }

    const isMemberOf = async () => {
        const roomData = await getDoc(doc(db, "rooms", roomId));
        return (roomData.data().members).includes(user.uid)
    }

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: roomId,
                msgId: uuidv4(),
                uid: user.uid,
                author: user.displayName,
                message: currentMessage,
                time: new Date(),
            };

            socket.emit("send_message", messageData);
            // console.log(messageData)
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };



    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
        //eslint-disable-next-line
    }, [socket]);

    return (
        <div className="Chat">
            {(!joined) ? (
                <div>
                    <h1>This doesn't seem correct!</h1>
                </div>

            ) : (
                <div className="chat-window">
                    <div className="chat-header">
                        <p>Live Chat</p>
                    </div>
                    <div className="chat-body">
                        <ScrollToBottom className="message-container">
                            {messageList.map((messageContent) => {
                                return (
                                    <Message
                                        key={messageContent.msgId}
                                        messageContent={messageContent}
                                        roomId={roomId} />
                                );
                            })}
                        </ScrollToBottom>
                    </div>
                    <div className="chat-footer">
                        <input
                            type="text"
                            value={currentMessage}
                            placeholder="Hey..."
                            onChange={(event) => {
                                setCurrentMessage(event.target.value);
                            }}
                            onKeyPress={(event) => {
                                event.key === "Enter" && sendMessage();
                            }}
                        />
                        <button onClick={sendMessage}>&#9658;</button>
                    </div>
                </div>)}
        </div>
    )
}

export default Chat
