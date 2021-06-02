using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ProchocBackend.Database
{
    public class BasketProduct
    {
        [Key]
        public int Id { get; set; }
        
        public Basket Basket { get; set; }
        
        [NotNull]
        public Product Product { get; set; }

        [NotNull]
        public int Amount { get; set; }
    }
}