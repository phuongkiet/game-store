using DataAccess.Models;
using DataTransferObject;
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
                    return Ok(new ApiResponse { Success = true, Message = "Registered successfully" });
                }
                return BadRequest(new ApiResponse { Success = false, Message = "Something not right" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse { Success = false, Message = ex.Message });
            }
        }


        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Success = false, Message = "Something not right with fields" });
            }

            var user = await _authRepository.Login(loginDTO);
            if (user != null)
            {
                if(user.Status == 0)
                {
                    return BadRequest(new ApiResponse { Success = false, Message = "Your account is unavailable" });
                }
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
                return Ok(new
                {
                    UserData = userData,
                    data = new ApiResponse
                    {
                        Success = true,
                        Message = "Logged in successfully"
                    }
                });
            }
            else
            {
                return Unauthorized(new ApiResponse
                {
                    Success = false,
                    Message = "Invalid credentials"
                });
            }
        }
    }
}
