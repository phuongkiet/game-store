using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class GameCode
    {
        [Key]
        public int GameCodeId { get; set; }

        [Required]
        public int GameId { get; set; }
        public Game Game { get; set; }

        [Required, MaxLength(14)]
        [RegularExpression(@"^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$", ErrorMessage = "The code must be in the format XXXX-XXXX-XXXX with capital letters and numbers.")]
        public string Code { get; set; }

        public bool IsRedeemed { get; set; } = false;

        public DateTime CreatedAt { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; }  

    }
}
