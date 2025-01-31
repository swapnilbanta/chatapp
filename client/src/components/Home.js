// src/components/Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button"; 
import Input from "./Input"; 
import { eventBus } from "../utils/EventBus"; // Import event bus
import "../Chat.css";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoinChat = () => {
    const usernameRegex = /^[a-zA-Z]+$/; // Only allows letters and numbers

    if (!userName.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!usernameRegex.test(userName)) {
      setError("Username can only contain letters");
      return;
    }

    setError(""); // Clear error if validation passes
    eventBus.emit('userJoined', userName); // Emit event when user joins
    navigate(`/chat?userName=${encodeURIComponent(userName)}`);
  };

  return (
    <div className="home-container">
      <div className="chat-card">
        <h1 className="app-title">ChatWave</h1>
        <h2 className="input-label">Enter Your Name</h2>
        <Input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name..."
          onKeyUp={(e) => e.key === "Enter" && handleJoinChat()}
          className="name-input"
        />
        {error && <p className="error-message">{error}</p>}
        <Button onClick={handleJoinChat} className="join-button">
          Join Chat
        </Button>
      </div>
    </div>
  );
};

export default Home;
