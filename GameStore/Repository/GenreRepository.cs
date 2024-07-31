using DataAccess.DAO;
using DataAccess.Models;
using Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class GenreRepository : IGenreRepository
    {
        //Trung gian giữa DAO vs Controller
        private readonly GenreDAO _genreDAO;
        public GenreRepository(GenreDAO genreDAO)
        {
            _genreDAO = genreDAO;
        }

        public async Task<List<Genre>> List()
        {
            return await _genreDAO.List();
        }

        public async Task<Genre> Get(int id)
        {
            return await _genreDAO.Get(id);
        }

        public async Task Delete(int id)
        {
            await _genreDAO.Delete(id);
        }

        public async Task Create(Genre genre)
        {
            await _genreDAO.Create(genre);
        }

        public async Task Update(Genre genre)
        {
            await _genreDAO.Update(genre);
        }
    }
}
