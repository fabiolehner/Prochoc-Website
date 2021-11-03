using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ProchocBackend.Database
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; } 
        [NotNull]
        public string FirstName { get; set; }
        [NotNull]
        public string LastName { get; set; }
        [NotNull]
        public string Email { get; set; }

        [NotNull]
        public string BillingAdress { get; set; }

        [NotNull]
        public string Country { get; set; }

        [NotNull]
        public string Phone { get; set; }
    }
}
