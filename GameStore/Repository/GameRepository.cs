using DataAccess.DAO;
using DataAccess.Helper;
using DataAccess.Models;
using Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class GameRepository : IGameRepository
    {
        private readonly GameDAO _gameDAO;

        public GameRepository(GameDAO gameDAO)
        {
            _gameDAO = gameDAO;
        }

        public async Task<List<Game>> List()
        {
            return await _gameDAO.List();
        }

        public async Task<PagedList<Game>> ListGameWithPaging(int page, int pageSize, string SearchTerm)
        {
            return await _gameDAO.ListGameWithPaging(page, pageSize, SearchTerm);
        }

        public async Task<Game> Get(int id)
        {
            return await _gameDAO.Get(id);
        }

        public async Task Create(Game game)
        {
            await _gameDAO.Create(game);
        }

        public async Task Delete(int id)
        {
            await _gameDAO.Delete(id);
        }

        public async Task Update(Game game)
        {
            await _gameDAO.Update(game);
        }

        public async Task<bool> IsGameInUse(int id)
        {
            return await _gameDAO.IsGameInUse(id);
        }
    }
}
