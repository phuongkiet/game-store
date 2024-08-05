using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class GameVideo
    {
        [Key]
        public int VideoId { get; set; }
        public string EmbedId { get; set; }
        public int GameId { get; set; }
        public Game Game { get; set; }
    }
}
