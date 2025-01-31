// src/components/Chat.js
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import User from "./User"; // Import the User component
import { eventBus } from "../utils/EventBus"; // Import event bus
import "../App.css";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get("userName") || "Guest"; // Get username from URL params

  const [myMessage, setMyMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null); // Manage WebSocket client state

  useEffect(() => {
    // Listen for new messages from the event bus
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: message.message, userName: message.userName },
      ]);
    };

    eventBus.on('newMessage', handleNewMessage);

    return () => {
      eventBus.off('newMessage', handleNewMessage);
    };
  }, []);

  const onSend = () => {
    if (myMessage.trim() && client && client.readyState === WebSocket.OPEN) {
      const messageData = {
        type: "message",
        message: myMessage,
        userName,
      };
      client.send(JSON.stringify(messageData)); // Send the message to the WebSocket
      setMyMessage(""); // Clear the input field
    } else {
      console.error("WebSocket is not open, unable to send message.");
    }
  };

  useEffect(() => {
    const newClient = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    setClient(newClient);

    newClient.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    newClient.onmessage = (message) => {
      const data = JSON.parse(message.data);
      // Add the received message from the WebSocket to the message list
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: data.message, userName: data.userName },
      ]);
    };

    newClient.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      newClient.close();
    };
  }, []);

  return (
    <>
      <div className="title">Socket Chat: {userName}</div>
      <div className="messages">
        {messages.map((message, key) => (
          <div
            key={key}
            className={`message ${
              userName === message.userName ? "flex-end" : "flex-start"
            }`}
          >
            <User userName={message.userName} />
            <p>{message.message}</p>
          </div>
        ))}
      </div>

      <div className="bottom form">
        <input
          type="text"
          value={myMessage}
          onChange={(e) => setMyMessage(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && onSend()}
          placeholder="Message"
        />
        <button onClick={onSend}>Send</button>
      </div>
    </>
  );
};

export default Chat;
