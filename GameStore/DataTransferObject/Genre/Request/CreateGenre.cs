using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTransferObject.Genre.Request
{
    public class CreateGenre
    {
        public int GenreId { get; set; }
        public string GenreName { get; set; }
    }
}
