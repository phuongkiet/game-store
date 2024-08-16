using DataAccess.Helper;
using DataAccess.Models;

namespace Repository.IRepository
{
    public interface IGameCodeRepository
    {
        Task Create(GameCode gameCode);
        Task Delete(int id);
        Task<GameCode> Get(int id);
        Task<bool> IsGameCodeInUse(int id);
        Task<List<GameCode>> List();
        Task<PagedList<GameCode>> ListGameCodeWithPaging(int page, int pageSize);
        Task Update(GameCode gameCode);
    }
}