using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ProchocBackend.Database
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        
        [NotNull]
        public string Name { get; set; }
        
        [NotNull]
        public string Price { get; set; }
        [NotNull]
        public string Picture { get; set; }
        
    }
}