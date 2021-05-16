using System.Diagnostics.CodeAnalysis;

namespace ProchocBackend.Database
{
    public class Product
    {
        public int Id { get; set; }
        
        [NotNull]
        public string Name { get; set; }
        
        [NotNull]
        public string Price { get; set; }
    }
}