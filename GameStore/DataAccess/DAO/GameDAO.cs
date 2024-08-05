using DataAccess.Helper;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{
    public class GameDAO
    {
        public async Task<List<Game>> List()
        {
            List<Game> list = new List<Game>();
            try
            {
                var context = new GameStoreDbContext();
                list = await context.Games.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return list;
        }
        public async Task<PagedList<Game>> ListGameWithPaging(int page, int pageSize, string SreachTerm)
        {
            IQueryable<Game> query = null;
            try
            {
                var context = new GameStoreDbContext();
                query = context.Games.Include(c => c.GameImage).AsQueryable();

                if (!string.IsNullOrEmpty(SreachTerm))
                {
                    query = query.Where(p => p.Title.ToLower().Contains(SreachTerm));
                }

                var result = await PagedList<Game>.ToPagedList(query.OrderBy(q => q.GameId), page, pageSize);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Game> Get(int id)
        {
            Game game = new Game();
            try
            {
                var context = new GameStoreDbContext();
                game = await context.Games.FirstOrDefaultAsync(p => p.GameId == id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return game;
        }

        public async Task Create(Game game)
        {
            var exist = await Get(game.GameId);
            try
            {
                if (exist != null)
                {
                    throw new Exception("Game " + $"{game.Title} already exist");
                    
                }
                else
                {
                    var context = new GameStoreDbContext();
                    game.Status = 1;
                    game.CreatedAt = DateTime.Now;
                    await context.Games.AddAsync(game);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Delete(int id)
        {
            try
            {
                using (var context = new GameStoreDbContext())
                {
                    var exist = await Get(id);
                    if (exist == null)
                    {
                        throw new Exception("Game not found");
                    }
                    //check if game is in use
                    if (await IsGameInUse(id))
                    {
                        throw new Exception("Cannot delete the game as it is associated with one or more tables.");
                    }
                    exist.Status = 0;
                    context.Games.Update(exist);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Update(Game game)
        {
            var exist = await Get(game.GameId);
            try
            {
                if ( exist != null)
                {
                    var context = new GameStoreDbContext();
                    exist.Title = game.Title;
                    exist.Price = game.Price;
                    exist.Description = game.Description;
                    exist.Stock = game.Stock;
                    exist.Status = game.Status;
                    context.Games.Update(exist);
                    await context.SaveChangesAsync();
                } 
                else
                {
                    throw new Exception("Game not found");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> IsGameInUse(int id)
        {
            //false mean not in use, true mean in use
            Boolean result = false;
            var context = new GameStoreDbContext();
            if (await context.GameGenres.AnyAsync(gg => gg.GameId == id) ? true : false) result = true;
            if (await context.GameCodes.AnyAsync(gg => gg.GameId == id) ? true : false) result = true;
            return result;
        }
    }
}
