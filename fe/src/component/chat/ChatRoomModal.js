import { useEffect } from "react";
import useChat from "../hook/useChat";

const ChatRoomModal = ({ roomName, onClose }) => {
  const { connectAdmin, disconnect, messages, sendMessage } = useChat();

  useEffect(() => {
    connectAdmin(roomName);
  }, [connectAdmin, roomName]);

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center w-full sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Chatting in: {roomName}
                  </h3>
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`mb-2 ${
                            msg.isIncoming ? "text-right" : "text-left"
                          }`}
                        >
                          <p className="text-xs text-gray-500">{msg.from}</p>
                          <p
                            className={`p-2 rounded-lg ${
                              msg.isIncoming ? "bg-blue-100" : "bg-gray-100"
                            }`}
                          >
                            {msg.text}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex mt-5">
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded-l-lg"
                        placeholder="Type a message..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && e.target.value) {
                            sendMessage(e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                      <button
                        className="bg-blue-500 p-2 rounded-r-lg text-white"
                        onClick={() => {
                          const input = document.querySelector("input");
                          if (input && input.value) {
                            sendMessage(input.value);
                            input.value = "";
                          }
                        }}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  disconnect();
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomModal;
