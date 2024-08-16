using DataTransferObject.User.Response;
using DataTransferObject;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Repository.IRepository;
using DataAccess.Models;
using DataTransferObject.Game.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Presentation.Hubs;
using DataTransferObject.GameCode.Response;
using DataTransferObject.GameCode.Request;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameCodeController : ControllerBase
    {
        private IGameCodeRepository _gameCodeRepository;
        private IGameRepository _gameRepository;
        private readonly IHubContext<NotificationHub> _notificationHubContext;


        public GameCodeController(IGameCodeRepository gameCodeRepository, IHubContext<NotificationHub> notificationHubContext)
        {
            _gameCodeRepository = gameCodeRepository;
            _notificationHubContext = notificationHubContext;
        }


        [HttpGet("list-gameCodes")]
        public async Task<IActionResult> ListGameCode()
        {
            return Ok(await _gameCodeRepository.List());
        }


        [HttpGet("get-gameCodes")]

        public async Task<IActionResult> ListGameCodeWithPaging(int page = 1, int pageSize = 3)
        {
            return Ok(await _gameCodeRepository.ListGameCodeWithPaging(page, pageSize));
        }


        [HttpGet("get-gameCode-admin/{id}")]

        public async Task<IActionResult> GetGameCodeByAdmin(int id)
        {
            return Ok(await _gameCodeRepository.Get(id));
        }

        [HttpGet("get-gameCode/{id}")]
        public async Task<IActionResult> GetGameCode(int id)
        {
            GameCode entity = await _gameCodeRepository.Get(id);
            var result = new GameCodeDTO {
                Code = entity.Code,
                IsRedeemed =  entity.IsRedeemed
            };
            return Ok(result);
        }

        [HttpPost("create-gameCode")]

        public async Task<IActionResult> CreateGameCode([FromBody] CreateGameCode requestEntity)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse { Success = false, Message = "Something not right with fields" });
                }

                var model = new GameCode()
                {
                    GameId = requestEntity.GameId,
                    Code = requestEntity.Code,
                    CreatedAt = DateTime.Now
                };

                await _gameCodeRepository.Create(model);
                var message = $"A new gamecode '{model.Code}' has been created.";
                await _notificationHubContext.Clients.All.SendAsync("ReceiveNotification", message);
                return Ok(new ApiResponse { Success = true, Message = "Created successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse { Success = false, Message = ex.Message });
            }
        }


        [HttpPut("update-gameCode/{id}")]

        public async Task<IActionResult> UpdateGame(int id, [FromBody] UpdateGameCode requestEntity)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse { Success = false, Message = "Something not right with fields" });
                }

                //check Game
                if (await _gameCodeRepository.Get(id) == null || id == null)
                {
                    return NotFound(new ApiResponse { Success = false, Message = "GameCode not found" });
                }

                var gc = new GameCode()
                {
                    GameCodeId = id,
                    IsRedeemed = requestEntity.IsRedeemed
                };

                await _gameCodeRepository.Update(gc);
                var message = $"GameCode has been updated.";
                await _notificationHubContext.Clients.All.SendAsync("ReceiveNotification", message);
                return Ok(new ApiResponse { Success = true, Message = "Updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse { Success = false, Message = ex.Message });
            }
        }

        [HttpDelete("delete-gameCode/{id}")]

        public async Task<IActionResult> DeleteGame(int id)
        {
            try
            {
                var g = await _gameCodeRepository.Get(id);
                //check if game is in use
                if (await _gameCodeRepository.IsGameCodeInUse(id))
                {
                    return StatusCode(400, new ApiResponse { Success = false, Message = "GameCode is in use with other tables, cannot delete." });
                }
                else
                {
                    await _gameCodeRepository.Delete(id);
                    var message = $"Game `{g.Code}` has been changed to inactive.";
                    await _notificationHubContext.Clients.All.SendAsync("ReceiveNotification", message);
                    return Ok(new ApiResponse { Success = true, Message = "Deleted successfully." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse { Success = false, Message = ex.Message });
            }
        }
    }
}
