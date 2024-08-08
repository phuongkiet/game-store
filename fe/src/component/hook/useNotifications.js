import { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

export const useNotifications = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Create a connection to the SignalR hub
    const connection = new HubConnectionBuilder()
      .withUrl("/NotificationHub") // Replace with your actual hub URL
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => {
        console.log("Connected to SignalR hub");

        // Listen for incoming notifications
        connection.on("ReceiveNotification", (message) => {
          alert(message); // Show the notification message
          setNotificationCount((prevCount) => prevCount + 1);
        });
      })
      .catch((error) => console.error("SignalR Connection Error:", error));

    // Cleanup on component unmount
    return () => {
      connection.stop();
    };
  }, []);

  return notificationCount;
};
