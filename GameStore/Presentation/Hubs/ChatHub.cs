using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ConcurrentDictionary<string, UserConnection> _userConnections;

        public ChatHub(ConcurrentDictionary<string, UserConnection> userConnections)
        {
            _userConnections = userConnections;
        }

        // User joins a room
        public async Task JoinRoom(string userName)
        {
            var roomName = userName; // Each user has their own room
            var now = DateTime.Now;

            _userConnections[Context.ConnectionId] = new UserConnection
            {
                Name = userName,
                JoinedAt = now,
                ConnectionId = Context.ConnectionId,
                RoomName = roomName
            };

            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
            await Clients.Group(roomName).SendAsync("ReceiveMessage", new
            {
                from = "System",
                text = $"User {userName} has joined the room.",
                sentAt = now,
                isIncoming = true
            });
        }
        public async Task JoinRoomAsAdmin(string roomName)
        {
            var adminConnections = _userConnections.Where(x => x.Value.Name == "Admin").ToList();

            foreach (var connection in adminConnections)
            {
                /*if (connection.Value.RoomName == roomName)
                {
                    Console.WriteLine("Admin is already in the room.");
                    return;
                }*/

                // Remove the existing admin connection from the group if in another room
                await Groups.RemoveFromGroupAsync(connection.Value.ConnectionId, connection.Value.RoomName);

                // Corrected the Remove method call with the 'out' parameter
                _userConnections.Remove(connection.Key, out _);
            }

            // Add the new admin connection
            _userConnections[Context.ConnectionId] = new UserConnection
            {
                Name = "Admin",
                ConnectionId = Context.ConnectionId,
                RoomName = roomName,
                Role = "Admin"
            };

            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
            await Clients.Group(roomName).SendAsync("ReceiveMessage", new
            {
                from = "System",
                text = "Admin has joined the room.",
                isIncoming = true
            });
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (_userConnections.TryRemove(Context.ConnectionId, out var userConnection))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, userConnection.RoomName);

                if (userConnection.Role != "Admin")
                {
                    await Clients.Group(userConnection.RoomName).SendAsync("ReceiveMessage", new
                    {
                        from = "System",
                        text = $"User {userConnection.Name} has left the room.",
                        isIncoming = true
                    });
                }
            }
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message)
        {
            if (_userConnections.TryGetValue(Context.ConnectionId, out var userConnection))
            {
                var roomName = userConnection.RoomName;

                // Log the details for debugging
                Console.WriteLine($"SendMessage called by: {userConnection.Name}, Room: {roomName}, Message: {message}");

                if(userConnection.Role == "Admin")
                {
                    await Clients.Group(roomName).SendAsync("ReceiveMessage", new
                    {
                        from = userConnection.Name,
                        text = message,
                        isIncoming = true
                    });
                }
                else
                {
                    await Clients.Group(roomName).SendAsync("ReceiveMessage", new
                    {
                        from = userConnection.Name,
                        text = message,
                        isIncoming = false
                    });
                }
            }
            else
            {
                // Log if the connection ID is not found
                Console.WriteLine($"SendMessage: ConnectionId {Context.ConnectionId} not found in _userConnections");
            }
        }


        public List<string> GetActiveRooms()
        {
            return _userConnections.Values.Select(c => c.RoomName).Distinct().ToList();
        }
    }

    public class UserConnection
    {
        public string Name { get; set; }
        public DateTime JoinedAt { get; set; }
        public string ConnectionId { get; set; }
        public string RoomName { get; set; }
        public string Role { get; set; }
    }
}
