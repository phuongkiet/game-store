using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTransferObject.Auth
{
    public class RegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z\u00C0-\u1EF9 ]*$", ErrorMessage = "Your name can only contain letters, spaces, and Vietnamese characters.")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 5)]
        public string Name { get; set; }
        [Required]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be 10 digits")]
        public string PhoneNumber { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string ConfirmedPassword { get; set; }
    }
}
