using DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DataAccess.Seeds
{
    public class Seed
    {
        public static async Task SeedUser(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("../DataAccess/Seeds/UserSeed.json");
            var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var users = JsonSerializer.Deserialize<List<User>>(userData, jsonOptions);

            var roles = new List<Role>
            {
                new Role {Name = "Client"},
                new Role {Name = "Staff"},
                new Role {Name = "Manager"},
                new Role {Name = "Admin"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.Email;
                user.EmailConfirmed = true;
                var result = await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Client");
            }

            var admin = new User
            {
                UserName = "admin@gmail.com",
                Name = "admin",
                Email = "admin@gmail.com",
                Status = 1,
                EmailConfirmed = true,
            };

            var resultAdmin = await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] { "Admin" });

            var manager = new User
            {
                UserName = "manager@gmail.com",
                Name = "manager",
                Email = "manager@gmail.com",
                Status = 1,
                EmailConfirmed = true,
            };

            await userManager.CreateAsync(manager, "Pa$$w0rd");
            await userManager.AddToRolesAsync(manager, new[] { "Manager" });
        }
    }
}
