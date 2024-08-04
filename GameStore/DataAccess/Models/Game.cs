using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class Game
    {
        [Key]
        public int GameId { get; set; }

        [Required, MaxLength(100)]
        public string Title { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public int Stock { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public byte Status { get; set; }

        public ICollection<GameGenre> GameGenres { get; set; }
        public ICollection<GameCode> GameCodes { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
