using DataTransferObject.User.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.IRepository;
using DataTransferObject;
using DataTransferObject.User.Request;
using DataAccess.Models;
using Repository;
using DataAccess.Helper;
using System.Collections.Immutable;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("list-users")]
        /*[Authorize(Roles = "Admin")]*/
        public async Task<IActionResult> ListUsers()
        {
            return Ok(await _userRepository.List());        
        }

        [HttpGet("get-users")]
        public async Task<IActionResult> ListUserPaging(int page = 1, int pageSize = 3, string searchTerm = null)
        {
            var data = await _userRepository.ListUserWithPaging(page, pageSize, searchTerm);
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

        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUser createUsers)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse { Success = false, Message = "Something not right with fields" });
                }

                var g = new User
                {
                    Name = createUsers.Name,
                    Email = createUsers.Email,
                    Birthday = createUsers.Birthday,
                    PhoneNumber = createUsers.PhoneNumber,
                    Status = 1,
                    Money = createUsers.Money,
                    UserName = createUsers.Email
                };

                await _userRepository.Create(g);
                return Ok(new ApiResponse { Success = true, Message = "Created successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse { Success = false, Message = ex.Message });
            }
        }

        [HttpGet("get-user/{id}")]
        public async Task<IActionResult> getUser(int id)
        {
            try
            {
                var user = await _userRepository.Get(id);
                var mapping = new UserDTO
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Birthday = user.Birthday,
                    PhoneNumber = user.PhoneNumber,
                    Status = user.Status,
                    Money = user.Money,
                    UserName = user.UserName
                };
                return Ok(mapping);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse { Success = false, Message = ex.Message });
            }
        }

        [HttpPut("update-user/{id}")]
        public async Task<IActionResult> updateUser(int id, [FromBody] updateUser updateUser)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse { Success = false, Message = "Something not right with fields" });
                }

                //check User
                if (await _userRepository.Get(id) == null || id == null)
                {
                    return NotFound(new ApiResponse { Success = false, Message = "User not found" });
                }

                var g = new User
                {
                    Id = id,
                    Name = updateUser.Name,
                    Email = updateUser.Email,
                    Birthday = updateUser.Birthday,
                    PhoneNumber = updateUser.PhoneNumber,
                    Status = updateUser.Status
                };

                await _userRepository.Update(g);
                return Ok(new ApiResponse { Success = true, Message = "Updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse { Success = false, Message = ex.Message });
            }
        }

        [HttpDelete("delete-user/{id}")]
        public async Task<IActionResult> deleteUser(int id)
        {
            try
            {
                await _userRepository.Delete(id);
                return Ok(new ApiResponse { Success = true, Message = "Deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse { Success = false, Message = ex.Message });
            }
        }
    }
}
