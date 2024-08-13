using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Presentation.Hubs;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ChatHub _chatHub;

        public ChatController(ChatHub chatHub)
        {
            _chatHub = chatHub;
        }

        [HttpGet("rooms")]
        public IActionResult GetRooms()
        {
            var rooms = _chatHub.GetActiveRooms();
            return Ok(rooms);
        }

        [HttpPost("join")]
        public IActionResult JoinRoomAsAdmin(string roomName)
        {
            // The logic to join a room as admin should be handled on the frontend by calling Hub's JoinRoomAsAdmin method.
            return Ok();
        }
    }
}
