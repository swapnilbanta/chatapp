// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import Home from './components/Home';
import Email from './components/Email';
import Chat from './components/Chat';
import Notification from './components/Notification'; // New micro-app

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/email" element={<Email />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notifications" element={<Notification />} /> {/* New route */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
