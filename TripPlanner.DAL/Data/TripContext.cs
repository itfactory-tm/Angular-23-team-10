using Microsoft.EntityFrameworkCore;
using TripPlanner.DAL.Models;

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
        public DbSet<Trip> Trips { get; set; }
        public DbSet<TripActivity> TripActivities { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Keyword> Keywords { get; set; }
        public DbSet<Category> Categories { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Trip>().ToTable("Trip");
            modelBuilder.Entity<TripActivity>().ToTable("TripActivity");
            modelBuilder.Entity<Activity>().ToTable("Activity");
            modelBuilder.Entity<Keyword>().ToTable("Keyword").HasMany(e => e.Trips).WithMany(e => e.Keywords).UsingEntity(t => t.ToTable("TripKeyword"));
            modelBuilder.Entity<Category>().ToTable("Category");

            modelBuilder.Entity<TripActivity>()
            .HasKey(ta => ta.TripActivityId);

            modelBuilder.Entity<TripActivity>()
                .HasOne(ta => ta.Trip)
                .WithMany(t => t.TripActivities)
                .HasForeignKey(ta => ta.TripId);

            modelBuilder.Entity<TripActivity>()
                .HasOne(ta => ta.Activity)
                .WithMany(a => a.TripActivities)
                .HasForeignKey(ta => ta.ActivityId);
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