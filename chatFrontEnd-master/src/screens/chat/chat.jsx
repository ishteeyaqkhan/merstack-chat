import React, { useState } from 'react'
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap'
import "./chat.css";
import { io } from "socket.io-client";
import Header from '../Header/header';

const socket = io("http://localhost:4000/");


const Chat = () => {
    const [chatUser, setChatUser] = useState([])
    const [selected, setSelected] = useState("")
    const [chatData, setChatData] = useState({})
    const [message, setMessage] = useState("")
    let user = localStorage.getItem("user");
    user = JSON.parse(user)
    useEffect(() => {
        socket.emit("joined", user?.data)
        socket.on("user_connect", (data) => {
            setChatUser(data)
        })
        socket.on("reciveMessage", updateChat)
        return () => {
            socket.emit("disconnect:socket", user)
        }
    }, [socket])
   
    const updateChat = (data) => {
        setChatData((res) => {
            if (!res[data?.phone]) {
                return {
                    ...res,
                    [data?.phone]: [data]
                }
            } else {
                return {
                    ...res,
                    [data.phone]: [...res[data.phone], data]
                }
            }
        })
    }
    const handleChat = (res) => {
        try {
            setSelected(res?.phone)
        } catch (error) {
            console.log(error)
        }
    }
    const sendMessage = () => {
        if (!message) return;
        if (chatData[selected]) {

            chatData[selected].push({
                ...user?.data,
                message: message
            })
            setChatData(chatData)
        } else {
            setChatData({
                [selected]: [{
                    ...user?.data,
                    message: message
                }],
                ...chatData
            })
        }
        socket.emit("message", {
            ...user?.data,
            message: message,
            reciver: selected,
            data: Date.now()
        })
        setMessage("")
    }

    console.log("chat", chatData)
    return (
        <>

            <div className='maindiv'>
                <Header />
                <div className='container-fluid'>
                    <div className='row no-gutters main-row'>
                        <div className='col-md-3 p-0'>
                            <div className='right-side'>
                                <div className='list-data'>
                                    <ul class="nav flex-column">
                                        {chatUser.map((user) => (
                                            <li class={`nav-item ${selected === user?.phone ? "current" : ""}`} onClick={() => handleChat(user)}>
                                                {user?.first_name} {" "} {user?.last_name}<br />
                                                <span>Last seen</span>
                                            </li>
                                        ))}

                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div className='col-md-9 p-0'>
                            <div className='left-side'>
                                {Array.isArray(chatData[selected]) && chatData[selected].map((chats) =>
                                    <div className='mian-chat-box'>
                                        <div className={chats?.phone == user?.phone ? 'chat-left' : "chat-right"}>
                                            <div className='chat-header'>
                                                <span>{chats?.first_name}</span>
                                                <span>{chats?.last_name}</span>
                                            </div>
                                            <div>{chats?.message}</div>
                                        </div>

                                    </div>)}
                                {selected && <div className='message-sends'>
                                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                                    <button onClick={sendMessage}>Send message</button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Chat