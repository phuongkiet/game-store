using DataAccess.Models;
using DataTransferObject;
using DataTransferObject.Game.Request;
using DataTransferObject.Game.Response;
using DataTransferObject.User.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Presentation.Hubs;
using Repository;
using Repository.IRepository;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private IGameRepository _gameRepository;
        private readonly IHubContext<NotificationHub> _notificationHubContext;
        public GameController(IGameRepository gameRepository, IHubContext<NotificationHub> notificationHubContext)
        {
            _gameRepository = gameRepository;
            _notificationHubContext = notificationHubContext;
        }

        [HttpGet("list-games")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ListGame()
        {
            return Ok(await _gameRepository.List());
        }

        [HttpGet("get-games")]
        public async Task<IActionResult> GetGames(int page = 1, int pageSize = 3, string searchTerm = null)
        {
            var games = await _gameRepository.ListGameWithPaging(page, pageSize, searchTerm);

            var gameViewModels = games.Select(game => new GameDTO
            {
                GameId = game.GameId,
                Title = game.Title,
                Description = game.Description,
                Price = game.Price,
                Stock = game.Stock,
                CreatedAt = game.CreatedAt,
                Status = game.Status,
                ImageUrl = game.GameImage?.Url
            }).ToList();

            var metadata = new
            {
                TotalCount = games.TotalCount,
                PageSize = games.PageSize,
                CurrentPage = games.CurrentPage,
                TotalPages = games.TotalPages,
                data = gameViewModels
            };
            return Ok(metadata);
        }

        [HttpGet("get-games-admin")]
        public async Task<IActionResult> GetGameAdmin(int page = 1, int pageSize = 3, string searchTerm = null)
        {
            var games = await _gameRepository.ListGameWithPagingAdmin(page, pageSize, searchTerm);

            var gameViewModels = games.Select(game => new GameDTO
            {
                GameId = game.GameId,
                Title = game.Title,
                Description = game.Description,
                Price = game.Price,
                Stock = game.Stock,
                CreatedAt = game.CreatedAt,
                Status = game.Status,
                ImageUrl = game.GameImage?.Url
            }).ToList();

            var metadata = new
            {
                TotalCount = games.TotalCount,
                PageSize = games.PageSize,
                CurrentPage = games.CurrentPage,
                TotalPages = games.TotalPages,
                data = gameViewModels
            };
            return Ok(metadata);
        }

        [HttpPost("create-game")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateGame([FromBody] CreateGame game)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse { Success = false, Message = "Something not right with fields" });
                }

                var g = new Game
                {
                    Title = game.Title,
                    Price = game.Price,
                    Stock = game.Stock,
                    Description = game.Description,
                    GameImage = new GameImage
                    {
                        Url = game.ImageUrl,
                        IsMain = true
                    }
                };

                await _gameRepository.Create(g);
                var message = $"A new game '{g.Title}' has been created.";
                await _notificationHubContext.Clients.All.SendAsync("ReceiveNotification", message);
                return Ok(new ApiResponse { Success = true, Message = "Created successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse { Success = false, Message = ex.Message });
            }
        }

        [HttpPut("update-game/{id}")]
        public async Task<IActionResult> UpdateGame(int id, [FromBody] UpdateGame game)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse { Success = false, Message = "Something not right with fields" });
                }

                //check Game
                if (await _gameRepository.Get(id) == null || id == null)
                {
                    return NotFound(new ApiResponse { Success = false, Message = "Game not found" });
                }

                var g = new Game()
                {
                    GameId = id,
                    Title = game.Title,
                    Price = game.Price,
                    Stock = game.Stock,
                    Description = game.Description,
                    Status = game.Status,
                    GameImage = new GameImage
                    {
                        Url = game.ImageUrl
                    }
                };

                await _gameRepository.Update(g);
                var message = $"Game '{g.Title}' has been updated.";
                await _notificationHubContext.Clients.All.SendAsync("ReceiveNotification", message);
                return Ok(new ApiResponse { Success = true, Message = "Updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse { Success = false, Message = ex.Message });
            }
        }

        [HttpDelete("delete-game/{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            try
            {
                var g = await _gameRepository.Get(id);
                //check if gmae is in use
                if (await _gameRepository.IsGameInUse(id))
                {
                    return Ok(new ApiResponse { Success = false, Message = "Game is in use with other tables, cannot delete." });
                }
                else
                {
                    await _gameRepository.Delete(id);
                    var message = $"Game `{g.Title}` has been changed to inactive.";
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
