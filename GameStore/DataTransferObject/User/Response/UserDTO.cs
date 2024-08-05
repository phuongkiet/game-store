using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTransferObject.User.Response
{
    public class UserDTO
    {
        public int Id {  get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public double Money { get; set; }
        public byte Status { get; set; }
        public string Token { get; set; }
    }
}
