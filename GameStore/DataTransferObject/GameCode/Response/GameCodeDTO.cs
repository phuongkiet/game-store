using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataTransferObject.Game.Response;

namespace DataTransferObject.GameCode.Response
{
    public class GameCodeDTO
    {
        public string Code { get; set; }
        public bool IsRedeemed { get; set; }
    }
}
