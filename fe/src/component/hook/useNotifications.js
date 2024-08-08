import { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

export const useNotifications = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationMessages, setNotificationMessages] = useState([]);
  const [showAllMessages, setShowAllMessages] = useState(false);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7189/NotificationHub")
      .withAutomaticReconnect()
      .build();
  
    connection.start()
      .then(() => {
        console.log("Connected to SignalR hub");
  
        connection.on("ReceiveNotification", (message) => {
          setNotificationCount((prevCount) => prevCount + 1);
          setNotificationMessages((prevMessages) => [message, ...prevMessages]);
          console.log(message);
        });
      })
      .catch((error) => console.error("SignalR Connection Error:", error));
  
    return () => {
      connection.stop();
    };
  }, []);  

  const resetNotificationCount = () => {
    setNotificationCount(0);
  };

  return { notificationCount, notificationMessages, showAllMessages, setShowAllMessages, resetNotificationCount };
};
