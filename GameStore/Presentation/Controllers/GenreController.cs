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
        //[Authorize(Roles = "Admin")]
        //IActionResult trả về status code
        public async Task<IActionResult> ListGenre()
        {
            return Ok(await _genreRepository.List());
        }
    }
}
