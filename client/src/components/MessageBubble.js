import React from 'react';

const MessageBubble = ({ message, userName, currentUserName }) => {
  const isOwnMessage = currentUserName === userName;

  return (
    <div className={`message-bubble ${isOwnMessage ? 'own' : 'other'}`}>
      <div className="message-header">
        <strong>{userName}</strong>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default MessageBubble;
