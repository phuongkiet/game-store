using DataAccess.Models;
using DataTransferObject.Auth;
using DataTransferObject.User.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.IRepository;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterDTO registerDTO)
        {
            try
            {
                var (result, user) = await _authRepository.Register(registerDTO);
                if (result.Succeeded)
                {
                    return Ok("Register Successfully");
                }
                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _authRepository.Login(loginDTO);
            if (user != null)
            {
                var token = await _authRepository.GenerateTokenString(user);
                var userData = new UserDTO
                {
                    Id = user.Id,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    UserName = user.UserName,
                    Name = user.Name,
                    Birthday = user.Birthday,
                    Money = user.Money,
                    Status = user.Status,
                    Token = token
                };
                return Ok(userData);
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
