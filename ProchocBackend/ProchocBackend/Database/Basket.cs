using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProchocBackend.Database
{
    public class Basket
    {
        [Key]
        public int Id { get; set; }
        
        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }
        
        public List<BasketProduct> ProductEntries { get; set; }
    }
}