using DataAccess.Helper;
using DataAccess.Models;

namespace Repository.IRepository
{
    public interface IGameRepository
    {
        Task Create(Game game);
        Task Delete(int id);
        Task<Game> Get(int id);
        Task<bool> IsGameInUse(int id);
        Task<List<Game>> List();
        Task<PagedList<Game>> ListGameWithPaging(int page, int pageSize, string SearchTerm);
        Task<PagedList<Game>> ListGameWithPagingAdmin(int page, int pageSize, string SearchTerm);
        Task Update(Game game);
    }
}