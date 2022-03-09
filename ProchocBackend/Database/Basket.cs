using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace ProchocBackend.Database
{
    public enum BasketStatus
    {
        NotOrdered, Ordered, Sent
    }

    public class BasketEntry
    {
        [Key]
        public int Id { get; set; }
        public int Count { get; set; }
        public Product Product { get; set; }
    }

    public class Basket
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("CustomerId")]
        [JsonIgnore]
        public User User { get; set; }
        public List<BasketEntry> Products { get; set; }
        public DateTime OrderDate { get; set; }
        public BasketStatus Status { get; set; }
    }
}