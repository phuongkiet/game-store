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

namespace DataAccess.DAO
{
    public class UserDAO
    {
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
            /*var exist = await Get(user.Id);
            try
            {
                if (exist != null)
                {
                    throw new Exception("Người dùng " + $"{user.Name} đã tồn tại");
                }
                else
                {
                    var context = new GameStoreDbContext();
                    await context.Users.AddAsync(user);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }*/
        }

        public async Task Delete(int id)
        {
            var exist = await Get(id);
            try
            {
                if ( exist != null)
                {
                    var context = new GameStoreDbContext();
                    context.Users.Update(exist);
                    await context.SaveChangesAsync();
                }
                else
                {
                    throw new Exception("Dữ liệu chưa có");
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
                    context.Users.Update(exist);
                    context.SaveChanges();
                    await context.SaveChangesAsync();
                }
                else
                {
                    throw new Exception("Dữ liệu chưa có");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
