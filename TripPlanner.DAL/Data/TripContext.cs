using Microsoft.EntityFrameworkCore;
using TripPlannerAPI.Models;

namespace TripPlannerAPI.Data
{
    public class TripContext : DbContext
    {
        public TripContext()
        {
        }



        public TripContext(DbContextOptions<TripContext> options) : base(options)
        { }
        public DbSet<User> Users { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=TripPlannerAPI;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

    }
}