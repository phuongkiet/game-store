using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTransferObject.GameCode.Request
{
    public class CreateGameCode
    {
        public int GameId { get; set; }
        public string Code { get; set; }
    }
}
