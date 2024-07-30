using Microsoft.AspNetCore.Identity;

namespace DataAccess.Models
{
    public class User : IdentityUser<int>
    {
        public string? Name { get; set; }
        public DateTime Birthday { get; set; }
        public double Money { get; set; }
        public byte Status { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
