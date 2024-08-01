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
    public class UserRepository : IUserRepository
    {
        private readonly UserDAO _userDAO;
        public UserRepository(UserDAO userDAO)
        {
            _userDAO = userDAO;
        }

        public async Task<List<User>> List()
        {
            return await _userDAO.List();
        }

        public async Task<User> Get(int id)
        {
            return await _userDAO.Get(id);
        }

        public async Task Create(User user)
        {
            await _userDAO.Create(user);
        }

        public async Task Delete(int id)
        {
            await _userDAO.Delete(id);
        }

        public async Task Update(User user)
        {
            await _userDAO.Update(user);
        }
    }
}
