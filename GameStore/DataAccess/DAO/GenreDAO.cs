using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{
    public class GenreDAO
    {
        public async Task< List<Genre> > List()
        {
            List<Genre> list = new List<Genre>();
            try
            {
                var context = new GameStoreDbContext();
                list = await context.Genres.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return list;
        }

        public async Task< Genre > Get(int id)
        {
            Genre genre = new Genre();
            try
            {
                var context = new GameStoreDbContext();
                genre = await context.Genres.FirstOrDefaultAsync(idGenre => idGenre.GenreId == id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return genre;
        }

        public async Task Create(Genre genre)
        {
            var exist = await Get(genre.GenreId);
            try
            {
                if (exist != null)
                {
                    throw new Exception("Dữ liệu " + $"{genre.GenreName} đã tồn tại");
                }
                else
                {
                    var context = new GameStoreDbContext();
                    await context.Genres.AddAsync(genre);
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
            var exist = await Get(id);
            try
            {
                if (exist != null)
                {
                    var context = new GameStoreDbContext();
                    context.Genres.Remove(exist);
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

        public async Task Update(Genre genre)
        {
            var exist = await Get(genre.GenreId);
            try
            {
                if (exist != null)
                {
                    var context = new GameStoreDbContext();
                    exist.GenreName = genre.GenreName;
                    context.Genres.Update(exist);
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
