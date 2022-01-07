namespace ProchocBackend.Database
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public string BillingAddress { get; set; }
        public UserRole Role { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}
