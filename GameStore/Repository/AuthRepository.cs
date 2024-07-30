using DataAccess.DAO;
using DataAccess.Models;
using DataTransferObject.Auth;
using Microsoft.AspNetCore.Identity;
using Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AuthDAO _authDAO;
        public AuthRepository(AuthDAO authDAO)
        {
            _authDAO = authDAO;
        }
        public async Task<User> Login(LoginDTO loginDTO) 
        { 
            return await _authDAO.Login(loginDTO);
        }
        public async Task<(IdentityResult, User)> Register(RegisterDTO registerDTO) 
        {
            return await _authDAO.Register(registerDTO);
        }
        public async Task<string> GenerateTokenString(User account)
        {
            return await _authDAO.GenerateTokenString(account);   
        }
        public async Task<bool> IsPhoneExistAsync(string phone) 
        {
            return await _authDAO.IsPhoneExistAsync(phone);
        }
        public async Task<User> GetUserById(int userId) 
        {
            return await _authDAO.GetUserById(userId);
        }
    }
}
