// src/components/Notification.js
import React, { useEffect, useState } from 'react';
import { eventBus } from '../utils/EventBus';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    eventBus.on('newNotification', (notification) => {
      setNotifications(prevNotifications => [...prevNotifications, notification]);
    });

    return () => {
      eventBus.off('newNotification');
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
