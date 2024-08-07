using DataAccess.Models;
using DataTransferObject.Auth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace DataAccess.DAO
{
    public class AuthDAO
    {
        private readonly GameStoreDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;

        public AuthDAO(GameStoreDbContext context, UserManager<User> userManager, IConfiguration config)
        {
            _context = context;
            _userManager = userManager;
            _config = config;
        }

        public async Task<(IdentityResult, User)> Register(RegisterDTO registerBody)
        {
            var user = new User
            {
                UserName = registerBody.Email,
                Email = registerBody.Email,
                Name = registerBody.Name,
                PhoneNumber = registerBody.PhoneNumber,
                Birthday = registerBody.Birthday,
                Money = 0,
                Status = 1,
            };
            var result = await _userManager.CreateAsync(user, registerBody.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Client");
            }
            return (result, result.Succeeded ? user : null);
        }

        public async Task<User> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user == null)
            {
                return null;
            }
            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDTO.Password);
            return isPasswordValid ? user : null;
        }

        public async Task<User> GetUserById(int userId)
        {
            User account = null;
            try
            {
                account = await _context.Users.SingleOrDefaultAsync(a => a.Id == userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return account;
        }

        public async Task<string> GenerateTokenString(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString())
            };

            var roles = await _userManager.GetRolesAsync(user);
            claims.AddRange(roles.Select(role => new Claim("role", role)));

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: signingCredentials
            );

            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            // Debugging: log token
            Console.WriteLine($"Generated token: {token}");

            return token;
        }

        public async Task<bool> IsPhoneExistAsync(string phone)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phone);
            return user != null;
        }
    }
}
