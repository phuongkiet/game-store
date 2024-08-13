import { useState, useEffect } from "react";
import useChat from "../hook/useChat";
import { getRooms } from "../../services/ChatService";
import ChatRoomModal from "./ChatRoomModal";

const AdminChatRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await getRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleJoinRoom = (roomName) => {
    setSelectedRoom(roomName);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-5">Chat Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Room
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms && rooms.length > 0 ? (
              rooms.map((room) => (
                <tr key={room} className="border-t border-gray-200">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {room}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex float-right">
                      <button
                        href="#"
                        className="text-lg text-sky-500 hover:text-sky-600"
                        onClick={() => handleJoinRoom(room)}
                      >Join</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No chat rooms available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedRoom && (
        <ChatRoomModal roomName={selectedRoom} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AdminChatRooms;
