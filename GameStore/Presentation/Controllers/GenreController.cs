using DataAccess.Models;
using DataTransferObject;
using DataTransferObject.Genre.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.IRepository;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private IGenreRepository _genreRepository;

        public GenreController(IGenreRepository genreRepository)
        {
            _genreRepository = genreRepository;
        }

        [HttpGet("Genres")]
        [Authorize(Roles = "Admin")]
        //IActionResult trả về status code
        public async Task<IActionResult> ListGenre()
        {
            return Ok(await _genreRepository.List());
        }

        [HttpGet("getGenres")]
        public async Task<IActionResult> ListGenrePaging(int page = 1, int pageSize = 3, string searchTerm = null)
        {
            var data = await _genreRepository.ListWithPaging(page, pageSize, searchTerm);
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

        [HttpPost("create-genre")]
        public async Task<IActionResult> CreateGenre([FromBody] CreateGenre genre)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse { Success = false, Message = "Something not right with fields" });
                }

                var g = new Genre
                {
                    GenreId = genre.GenreId,
                    GenreName = genre.GenreName
                };

                await _genreRepository.Create(g);
                return Ok(new ApiResponse { Success = true, Message = "Created successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse { Success = false, Message = ex.Message });
            }
        }
        [HttpPut("update-genre/{id}")]
        public async Task<IActionResult> UpdateGenre(int id, [FromBody] UpdateGenre genre)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse { Success = false, Message = "Something not right with fields" });
                }

                var g = new Genre
                {
                    GenreId = id,
                    GenreName = genre.GenreName
                };

                await _genreRepository.Update(g);
                return Ok(new ApiResponse { Success = true, Message = "Updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse { Success = false, Message = ex.Message });
            }
        }
        [HttpDelete("delete-genre/{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            try
            {
                if (await _genreRepository.IsGenreInUse(id))
                {
                    return StatusCode(400, new ApiResponse { Success = false, Message = "Genre is in use with a game, cannot delete." });
                }
                else
                {
                    await _genreRepository.Delete(id);
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
