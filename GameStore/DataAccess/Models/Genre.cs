using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class Genre
    {
        [Key]
        public int GenreId { get; set; }

        [Required, MaxLength(50)]
        public string GenreName { get; set; }

        public ICollection<GameGenre> GameGenres { get; set; }
    }
}
