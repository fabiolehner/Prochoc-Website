using Microsoft.EntityFrameworkCore;

namespace ProchocBackend.Database
{
    public class ProchocDbContext : DbContext
    {
        public ProchocDbContext(DbContextOptions<ProchocDbContext> options)
            : base(options)
        { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
    }
}