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
    public class GameCodeRepository : IGameCodeRepository
    {
        private readonly GameCodeDAO _gameCodeDAO;

        public GameCodeRepository(GameCodeDAO gameCodeDAO)
        {
            _gameCodeDAO = gameCodeDAO;
        }

        public async Task<List<GameCode>> List()
        {
            return await _gameCodeDAO.List();
        }

        public async Task<PagedList<GameCode>> ListGameCodeWithPaging(int page, int pageSize)
        {
            return await _gameCodeDAO.ListGameCodeWithPaging(page, pageSize);
        }

        public async Task<GameCode> Get(int id)
        {
            return await _gameCodeDAO.Get(id);
        }

        public async Task Create(GameCode gameCode)
        {
            await _gameCodeDAO.Create(gameCode);
        }
        public async Task Delete(int id)
        {
            await _gameCodeDAO.Delete(id);
        }

        public async Task Update(GameCode gameCode)
        {
            await _gameCodeDAO.Update(gameCode);
        }

        public async Task<bool> IsGameCodeInUse(int id)
        {
            return await _gameCodeDAO.IsGameCodeInUse(id);
        }
    }
}
