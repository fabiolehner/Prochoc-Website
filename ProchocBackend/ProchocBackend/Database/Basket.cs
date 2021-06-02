using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace ProchocBackend.Database
{
    public class Basket
    {
        [Key]
        public int Id { get; set; }
        
        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }

        [NotNull]
        public List<BasketProduct> ProductEntries { get; set; } = new();
    }
}