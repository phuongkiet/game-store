import { HubConnectionBuilder, LogLevel, HubConnectionState } from "@microsoft/signalr";
import { useEffect, useState } from "react";

const useChat = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (connection) {
        connection
          .stop()
          .catch((err) => console.error("Disconnect failed: ", err));
      }
    };
  }, [connection]);

  const connectUser = (userName) => {
    if (connection && connection.state === HubConnectionState.Connected) {
      console.warn("User is already connected.");
      return;
    }

    createConnection().then((newConnection) => {
      newConnection
        .start()
        .then(() => {
          newConnection.invoke("JoinRoom", userName);
          setupMessageHandling(newConnection);
          setConnection(newConnection);
        })
        .catch((err) => handleConnectionError(err, "User connection"));
    });
  };

  const connectAdmin = (roomName) => {
    if (connection && connection.state === HubConnectionState.Connected) {
      console.warn("Admin is already connected.");
      return;
    }

    disconnect(); // Ensure any existing connection is stopped

    createConnection().then((newConnection) => {
      newConnection
        .start()
        .then(() => {
          newConnection.invoke("JoinRoomAsAdmin", roomName);
          setupMessageHandling(newConnection);
          setConnection(newConnection);
        })
        .catch((err) => handleConnectionError(err, "Admin connection"));
    });
  };

  const createConnection = () => {
    return new Promise((resolve) => {
      const newConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7189/ChatHub")
        .configureLogging(LogLevel.Debug)
        .withAutomaticReconnect([0, 2000, 10000, 30000]) // Auto-reconnect with exponential backoff
        .build();

      newConnection.onreconnecting((error) => {
        console.warn("Reconnecting...", error);
      });

      newConnection.onreconnected((connectionId) => {
        console.log("Reconnected with connectionId: ", connectionId);
      });

      newConnection.onclose((error) => {
        handleConnectionClose(error);
      });

      resolve(newConnection);
    });
  };

  const setupMessageHandling = (newConnection) => {
    newConnection.on("ReceiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  };

  const sendMessage = (message) => {
    if (connection) {
      connection
        .invoke("SendMessage", message)
        .catch((err) => handleConnectionError(err, "Send message"));
    }
  };

  const disconnect = () => {
    if (connection) {
      connection
        .stop()
        .then(() => {
          setConnection(null);
          console.log("Disconnected successfully.");
        })
        .catch((err) => console.error("Disconnect failed: ", err));
    }
  };

  const handleConnectionError = (error, context) => {
    if (error?.message.includes("Invocation canceled due to the underlying connection being closed")) {
      console.warn(`${context} failed due to connection being closed.`, error);
    } else if (error) {
      console.error(`${context} failed: `, error);
    } else {
      console.error(`${context} failed: Unknown error`);
    }
  };

  const handleConnectionClose = (error) => {
    if (error) {
      console.error("Connection closed with error: ", error.message || error);
    } else {
      console.log("Connection closed gracefully.");
    }
  };

  return { connectUser, connectAdmin, disconnect, sendMessage, messages };
};

export default useChat;
