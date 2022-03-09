using Microsoft.EntityFrameworkCore;

namespace ProchocBackend.Database
{
    public class ProchocDbContext : DbContext
    {
        public ProchocDbContext(DbContextOptions<ProchocDbContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<Basket>()
            //     .HasMany(c => c.Products)
            //     .WithMany(x => x.Baskets);
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<BasketEntry> BasketEntries { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
