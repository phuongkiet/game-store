using DataAccess.Helper;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
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

        public async Task<PagedList<Genre>> ListWithPaging(int page, int pageSize, string searchTerm)
        {
            IQueryable<Genre> query = null;
            try
            {
                var context = new GameStoreDbContext();
                query = context.Genres.AsQueryable();

                if (!string.IsNullOrEmpty(searchTerm))
                {
                    query = query.Where(p => p.GenreName.ToLower().Contains(searchTerm));
                }

                var result = await PagedList<Genre>.ToPagedList(query.OrderBy(q => q.GenreId), page, pageSize);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
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
                    throw new Exception("Genre " + $"{genre.GenreName} already exist");
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
            try
            {
                using (var context = new GameStoreDbContext())
                {
                    var exist = await Get(id);
                    if (exist == null)
                    {
                        throw new Exception("Genre not found.");
                    }

                    if (await IsGenreInUse(id))
                    {
                        throw new Exception("Cannot delete the genre as it is associated with one or more games.");
                    }

                    context.Genres.Remove(exist);
                    await context.SaveChangesAsync();
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
                    throw new Exception("Genre not found");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> IsGenreInUse(int id)
        {
            var context = new GameStoreDbContext();
            return await context.GameGenres.AnyAsync(gg => gg.GenreId == id) ? true : false;
        }
    }
}
