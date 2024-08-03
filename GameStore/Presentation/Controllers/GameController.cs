﻿using DataAccess.Models;
using DataTransferObject;
using DataTransferObject.Game.Request;
using DataTransferObject.User.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Repository.IRepository;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private IGameRepository _gameRepository;

        public GameController(IGameRepository gameRepository)
        {
            _gameRepository = gameRepository;
        }

        [HttpGet("list-games")]
        public async Task<IActionResult> ListGame()
        {
            return Ok(await _gameRepository.List());
        }

        [HttpGet("get-games")]
        public async Task<IActionResult> GetGames(int page = 1, int pageSize = 3, string searchTerm = null)
        {
            var data = await _gameRepository.ListGameWithPaging(page, pageSize, searchTerm);
            var metadata = new
            {
                data.TotalCount,
                data.PageSize,
                data.CurrentPage,
                data.TotalPages,
                data
            };
            return Ok(metadata);
        }

        [HttpPost("create-game")]
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
                };

                await _gameRepository.Create(g);
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
                };

                await _gameRepository.Update(g);
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
                //check if gmae is in use
                if (await _gameRepository.IsGameInUse(id))
                {
                    return StatusCode(400, new ApiResponse { Success = false, Message = "Game is in use with other tables, cannot delete." });
                }
                else
                {
                    await _gameRepository.Delete(id);
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
