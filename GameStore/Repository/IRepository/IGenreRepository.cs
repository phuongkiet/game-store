using DataAccess.Helper;
using DataAccess.Models;

namespace Repository.IRepository
{
    public interface IGenreRepository
    {
        Task Create(Genre genre);
        Task Delete(int id);
        Task<Genre> Get(int id);
        Task<List<Genre>> List();
        Task Update(Genre genre);
        Task<PagedList<Genre>> ListWithPaging(int page, int pageSize, string searchTerm);
        Task<bool> IsGenreInUse(int id);
    }
}