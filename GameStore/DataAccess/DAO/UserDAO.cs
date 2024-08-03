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
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using DataTransferObject.Auth;
using DataAccess.Helper;

namespace DataAccess.DAO
{
    public class UserDAO
    {

        private readonly UserManager<User> _userManager;

        public UserDAO(UserManager<User> userManager) 
        { 
            userManager = _userManager;
        }
        public async Task<List<User>> List()
        {
            List<User> list = new List<User>();
            try
            {
                var context = new GameStoreDbContext();
                list = await context.Users.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return list;
        }

        public async Task<PagedList<User>> ListUserWithPaging(int page, int pageSize, string SreachTerm)
        {
            IQueryable<User> query = null;
            try
            {
                var context = new GameStoreDbContext();
                query = context.Users.AsQueryable();

                if (!string.IsNullOrEmpty(SreachTerm))
                {
                    query = query.Where(p => p.UserName.ToLower().Contains(SreachTerm));
                }

                var result = await PagedList<User>.ToPagedList(query.OrderBy(q => q.Id), page, pageSize);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        public async Task<User> Get(int id)
        {
            User user = new User();
            try
            {
                var context = new GameStoreDbContext();
                user = await context.Users.FirstOrDefaultAsync(UserId => UserId.Id == id);
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return user;
        }

        public async Task Create(User user)
        {
            var exist = await Get(user.Id);
            try
            {
                if (exist != null)
                {
                    throw new Exception("User " + $"{user.Name} already exist");
                }
                else
                {
                    string password = "Pa$$w0rd";
                    await _userManager.CreateAsync(user, password);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Delete(int id)
        {
            var exist = await Get(id);
            try
            {
                if ( exist != null)
                {
                    var context = new GameStoreDbContext();
                    //0: unavailable/ 1: available
                    exist.Status = 0;
                    context.Users.Update(exist);
                    await context.SaveChangesAsync();
                }
                else
                {
                    throw new Exception("User not found");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Update(User user)
        {
            var exist = await Get(user.Id);
            try
            {
                if (exist != null)
                {
                    var context = new GameStoreDbContext();
                    exist.Name = user.Name;
                    exist.Email = user.Email;
                    exist.PhoneNumber = user.PhoneNumber;
                    exist.Birthday = user.Birthday;
                    exist.UserName = user.UserName;    
                    context.Users.Update(exist);
                    context.SaveChanges();
                    await context.SaveChangesAsync();
                }
                else
                {
                    throw new Exception("User not found");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
