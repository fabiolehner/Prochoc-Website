using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProchocBackend.Database
{
    public class Image
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public bool IsDefault { get; set; }
    }
}
