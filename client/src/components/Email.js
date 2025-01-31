import React, { useEffect } from 'react';
import { eventBus } from '../utils/EventBus'; // Import event bus

const Email = () => {
  useEffect(() => {
    const handleNewMessage = (message) => {
      console.log("New message received in email:", message);
      // You can update UI here for the new message
    };

    const handleUserJoined = (userName) => {
      console.log(`${userName} has joined the chat`);
    };

    eventBus.on('newMessage', handleNewMessage); // Listen for new messages
    eventBus.on('userJoined', handleUserJoined); // Listen for user joining

    return () => {
      eventBus.off('newMessage', handleNewMessage);
      eventBus.off('userJoined', handleUserJoined);
    };
  }, []);

  return (
    <div>
      <h2>Email Micro-frontend</h2>
    </div>
  );
};

export default Email;
