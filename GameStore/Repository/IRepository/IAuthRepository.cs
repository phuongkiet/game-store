using DataAccess.Models;
using DataTransferObject.Auth;
using Microsoft.AspNetCore.Identity;

namespace Repository.IRepository
{
    public interface IAuthRepository
    {
        Task<string> GenerateTokenString(User account);
        Task<bool> IsPhoneExistAsync(string phone);
        Task<User> Login(LoginDTO loginDTO);
        Task<(IdentityResult, User)> Register(RegisterDTO registerDTO);
        Task<User> GetUserById(int userId);
    }
}