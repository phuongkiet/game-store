import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import useChat from "../hook/useChat";

const ChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, admin } = useContext(UserContext);
  const { messages, sendMessage, connectUser, disconnect } = useChat();

  const handleBubbleClick = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      try {
        connectUser(user ? user.username : admin.username, user ? user.role : admin.role);
      } catch (error) {
        console.error("Error connecting to chat:", error);
      }
    } else {
      try {
        disconnect();
      } catch (error) {
        console.error("Error disconnecting from chat:", error);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div className={`relative`}>
        <button
          className="w-12 h-12 bg-blue-500 rounded-full text-white flex items-center justify-center"
          onClick={handleBubbleClick}
        >
          💬
        </button>
        {isOpen && (
          <div className="absolute bottom-16 right-0 w-72 h-96 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 h-full flex flex-col">
              <div className="flex-1 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-2 ${msg.isIncoming ? 'text-left' : 'text-right'}`}>
                    <p className="text-xs text-gray-500">{msg.from}</p>
                    <p className={`p-2 rounded-lg ${msg.isIncoming ? 'bg-gray-100' : 'bg-blue-100'}`}>
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-l-lg"
                  placeholder="Type a message..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      sendMessage(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  className="bg-blue-500 p-2 rounded-r-lg text-white"
                  onClick={() => {
                    const input = document.querySelector('input');
                    if (input && input.value) {
                      sendMessage(input.value);
                      input.value = '';
                    }
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
