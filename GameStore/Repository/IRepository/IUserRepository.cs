using DataAccess.Helper;
using DataAccess.Models;

namespace Repository.IRepository
{
    public interface IUserRepository
    {
        Task Create(User user);
        Task Delete(int id);
        Task<User> Get(int id);
        Task<List<User>> List();
        Task Update(User user);
        Task<PagedList<User>> ListUserWithPaging(int page, int pageSize, string SreachTerm);
    }
}