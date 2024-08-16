using DataAccess.Helper;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{
    public class GameCodeDAO
    {
        public async Task<List<GameCode>> List()
        {
            List<GameCode> list = new List<GameCode>();

            try
            {
                var context = new GameStoreDbContext();
                list = await context.GameCodes.ToListAsync();

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return list;
        }

        public async Task<PagedList<GameCode>> ListGameCodeWithPaging(int page, int pageSize)
        {
            IQueryable<GameCode> query = null;
            try
            {
                var context = new GameStoreDbContext();
                query = context.GameCodes.AsQueryable();
                var result = await PagedList<GameCode>.ToPagedList(query.OrderBy(q => q.GameCodeId), page, pageSize);
                return result;

            } catch(Exception e) {
                throw new Exception(e.Message);
            }
        }

        public async Task<GameCode> Get(int id)
        {
            GameCode gameCode = new GameCode();

            try
            {
                var context = new GameStoreDbContext();
                gameCode = await context.GameCodes.FirstOrDefaultAsync(p => p.GameCodeId == id);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return gameCode;
        }

        public async Task Create(GameCode gameCode)
        {
            try
            {   
                var context = new GameStoreDbContext();
                await context.GameCodes.AddAsync(gameCode);
                await context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message);
                throw new Exception(e.Message, e);
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
                        throw new Exception("GameCode not found");
                    }
                    //check if game is in use
                    if (await IsGameCodeInUse(id))
                    {
                        throw new Exception("Cannot delete the GameCode as it is associated with one or more tables.");
                    }

                    context.GameCodes.Remove(exist);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task Update(GameCode gameCode)
        {
            var exist = await Get(gameCode.GameCodeId);

            try
            {
                if (exist != null)
                {
                    var context = new GameStoreDbContext();
                    exist.IsRedeemed = gameCode.IsRedeemed;
                    context.GameCodes.Update(exist);
                    await context.SaveChangesAsync();
                }
                else
                {
                    throw new Exception("GameCode not found");
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<bool> IsGameCodeInUse(int id)
        {
            //false mean not in use, true mean in use
            Boolean result = false;
            var context = new GameStoreDbContext();
            if (await context.OrderDetails.AnyAsync(gg => gg.GameCodeId == id) ? true : false) result = true;
            return result;
        }
    }
}
