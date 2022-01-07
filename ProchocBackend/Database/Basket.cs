<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Database/Basket.cs
﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProchocBackend.Database
{
=======
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

    public class BasketEntry
    {
        [Key]
        public int Id { get; set; }
        public int Count { get; set; }
        public Product Product { get; set; }
    }

>>>>>>> Stashed changes:ProchocBackend/Database/Basket.cs
    public class Basket
    {
        [Key]
        public int Id { get; set; }
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Database/Basket.cs
        
        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }
=======
        [ForeignKey("CustomerId")]
        public User User { get; set; }
        public List<BasketEntry> Products { get; set; }
        public DateTime OrderDate { get; set; }
        public BasketStatus Status { get; set; }
>>>>>>> Stashed changes:ProchocBackend/Database/Basket.cs
    }
}