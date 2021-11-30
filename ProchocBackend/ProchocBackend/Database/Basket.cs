using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace ProchocBackend.Database
{
    public enum BasketStatus
    {
        NotOrdered, Ordered, Shipped, Arrived
    }

    public class Basket
    {
        [Key]
        public int Id { get; set; }
        
        [ForeignKey("CustomerId")]
        public User User { get; set; }

        [NotNull]
        public int TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
        public BasketStatus Status { get; set; }
    }
}