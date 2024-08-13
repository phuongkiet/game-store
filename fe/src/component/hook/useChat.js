import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";

const useChat = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (connection) {
        connection.stop().catch((err) => console.error("Disconnect failed: ", err));
      }
    };
  }, [connection]);

  const connectUser = (userName) => {
    if (connection) {
      console.warn("User is already connected.");
      return;
    }

    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7189/ChatHub")
      .configureLogging(LogLevel.Debug)
      .build();

    newConnection
      .start()
      .then(() => {
        newConnection.invoke("JoinRoom", userName);

        newConnection.on("ReceiveMessage", (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        setConnection(newConnection);
      })
      .catch((err) => console.error("Connection failed: ", err));
  };

  const connectAdmin = (roomName) => {
    if (connection) {
      console.warn("Admin is already connected.");
      return;
    }

    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7189/ChatHub")
      .configureLogging(LogLevel.Debug)
      .build();

    newConnection
      .start()
      .then(() => {
        newConnection.invoke("JoinRoomAsAdmin", roomName);

        newConnection.on("ReceiveMessage", (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        setConnection(newConnection);
      })
      .catch((err) => console.error("Connection failed: ", err));
  };

  const disconnect = () => {
    if (connection) {
      connection.stop().catch((err) => console.error("Disconnect failed: ", err));
    }
  };

  const sendMessage = (message) => {
    if (connection) {
      connection
        .invoke("SendMessage", message)
        .catch((err) => console.error("Send failed: ", err));
    }
  };

  return { connectUser, connectAdmin, disconnect, sendMessage, messages };
};

export default useChat;
