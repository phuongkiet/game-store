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

        public static async Task SeedGenre(GameStoreDbContext _context)
        {
            if(await _context.Genres.AnyAsync()) { return; }

            var list = new List<Genre>
            {
                new Genre {GenreName="Action"},
                new Genre {GenreName="RPG"},
                new Genre {GenreName="Adventure"},
                new Genre {GenreName="Visual Novel"},
                new Genre {GenreName="Simulation"},
                new Genre {GenreName="Horror"},
                new Genre {GenreName="Indie"},
                new Genre {GenreName="Strategy"},
                new Genre {GenreName="Turn-Based"}
            };

            foreach (var i in list)
            {
                await _context.Genres.AddAsync(i);
                await _context.SaveChangesAsync();
            }
        }

        public static async Task SeedGame(GameStoreDbContext _context)
        {
            if (await _context.Games.AnyAsync()) { return; }

            var game = await File.ReadAllTextAsync("../DataAccess/Seeds/GameSeed.json");
            var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var m = JsonSerializer.Deserialize<List<Game>>(game, jsonOptions);

            foreach (var i in m)
            {
                await _context.Games.AddAsync(i);
                await _context.SaveChangesAsync();
            }
        }
        public static async Task SeedGameGenre(GameStoreDbContext _context)
        {
            if (await _context.GameGenres.AnyAsync()) { return; }

            var gameGenre = await File.ReadAllTextAsync("../DataAccess/Seeds/GameGenreSeed.json");
            var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var m = JsonSerializer.Deserialize<List<GameGenre>>(gameGenre, jsonOptions);

            foreach (var i in m)
            {
                await _context.GameGenres.AddAsync(i);
                await _context.SaveChangesAsync();
            }
        }
        public static async Task SeedGameCode(GameStoreDbContext _context)
        {
            if (await _context.GameCodes.AnyAsync()) { return; }

            var gameCode = await File.ReadAllTextAsync("../DataAccess/Seeds/GameCodeSeed.json");
            var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var m = JsonSerializer.Deserialize<List<GameCode>>(gameCode, jsonOptions);

            foreach (var i in m)
            {
                await _context.GameCodes.AddAsync(i);
                await _context.SaveChangesAsync();
            }
        }
    }
}
