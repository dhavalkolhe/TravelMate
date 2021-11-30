import React, { useEffect, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client"
import './Chat.css'

const socket = io("http://localhost:8000", {
    transports: ['websocket', 'polling', 'flashsocket']
});

function Chat({ roomId }) {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState();
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        socket.emit("join_room", roomId);
        setJoined(true);
        //eslint-disable-next-line
    }, [])

    const joinRoom = () => {
        if (username && room) {
            socket.emit("join_room", room);
        }
        setJoined(true);
    }

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: roomId,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
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
        <div>
            {(!joined) ? (
                <div>
                    <h1>Join a room</h1>

                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username..."
                        onChange={(e) => setUsername(e.target.value)} />
                    <input
                        type="text"
                        name="room"
                        value={room}
                        placeholder="Room..."
                        onChange={(e) => {
                            setRoom(e.target.value)
                        }} />
                    <button onClick={joinRoom}>Join room</button>
                </div>

            ) : (
                <div className="chat-window">
                    <div className="chat-header">
                        <p>Live Chat</p>
                    </div>
                    <div className="chat-body">
                        <ScrollToBottom className="message-container">
                            {messageList.map((messageContent, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="message"
                                        id={username === messageContent.author ? "you" : "other"}
                                    >
                                        <div>
                                            <div className="message-content">
                                                <p>{messageContent.message}</p>
                                            </div>
                                            <div className="message-meta">
                                                <p id="time">{messageContent.time}</p>
                                                <p id="author">{messageContent.author}</p>
                                            </div>
                                        </div>
                                    </div>
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
