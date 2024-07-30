using Microsoft.AspNetCore.Identity;

namespace DataAccess.Models
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole>? UserRoles { get; set; }
    }
}
