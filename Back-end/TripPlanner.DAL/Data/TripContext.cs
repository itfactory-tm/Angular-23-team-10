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
        // public DbSet<User> Users { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<TripActivity> TripActivities { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Keyword> Keywords { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<UserTrip> UserTrips { get; set; }
        public DbSet<TripKeyword> TripKeywords { get; set; }
        public DbSet<TripCategory> TripCategories { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Trip>().ToTable("Trip");
            modelBuilder.Entity<TripActivity>().ToTable("TripActivity");
            modelBuilder.Entity<Activity>().ToTable("Activity");
            modelBuilder.Entity<Keyword>().ToTable("Keyword");
            modelBuilder.Entity<Category>().ToTable("Category");
            modelBuilder.Entity<UserTrip>().ToTable("UserTrip");
            modelBuilder.Entity<TripKeyword>().ToTable("TripKeyword");
            modelBuilder.Entity<TripCategory>().ToTable("TripCategory");

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


            modelBuilder.Entity<UserTrip>()// Define the Entity configuration for the UserTrip entity.                           
                .HasKey(ut => new { ut.UserId, ut.TripId });// Set a composite primary key for UserTrip entity using UserId and TripId.
            //modelBuilder.Entity<UserTrip>()// Configure the relationship between UserTrip and User entities.                                     
            //     .HasOne(ut => ut.UserId)// UserTrip has a reference to a User entity.                                   
            //     .WithMany(t => t.Trips)// Each User can be associated with multiple trips. 
            //     .HasForeignKey(ut => ut.UserId);// Set the foreign key relationship with the UserId property in UserTrip.
            modelBuilder.Entity<UserTrip>()// Configure the relationship between UserTrip and Trip entities.                     
                .HasOne(ut => ut.Trip)// UserTrip has a reference to a Trip entity.                     
                .WithMany(u => u.Users)// Each Trip can have multiple users associated with it.
                .HasForeignKey(ut => ut.TripId);// Set the foreign key relationship with the TripId property in UserTrip.

            modelBuilder.Entity<TripCategory>()// Define the primary key for the 'TripCategory' entity using a composite key composed of 'TripId' and 'CategoryId'.
                .HasKey(tc => new { tc.TripId, tc.CategoryId });
            modelBuilder.Entity<TripCategory>()// Create a relationship between 'TripCategory' and 'Trip' entities.
                .HasOne(tc => tc.Trip) // Each 'TripCategory' has one 'Trip'.
                .WithMany(t => t.Categories) // Each 'Trip' can have many 'TripCategory' items, forming a collection called 'Categories'.
                .HasForeignKey(tc => tc.TripId); // Set the foreign key property in 'TripCategory' to reference the 'Trip' entity's primary key, 'TripId'.
            modelBuilder.Entity<TripCategory>()// Create a relationship between 'TripCategory' and 'Category' entities.
                .HasOne(tc => tc.Category) // Each 'TripCategory' has one 'Category'.
                .WithMany(c => c.Trips) // Each 'Category' can have many 'TripCategory' items, forming a collection called 'Trips'.
                .HasForeignKey(tc => tc.CategoryId); // Set the foreign key property in 'TripCategory' to reference the 'Category' entity's primary key, 'CategoryId'.

            modelBuilder.Entity<TripKeyword>()
                .HasKey(tc => new { tc.TripId, tc.KeywordId });
            modelBuilder.Entity<TripKeyword>()
                .HasOne(tc => tc.Trip)
                .WithMany(t => t.Keywords)
                .HasForeignKey(tc => tc.TripId);
            modelBuilder.Entity<TripKeyword>()
                .HasOne(tc => tc.Keyword)
                .WithMany(c => c.Trips)
                .HasForeignKey(tc => tc.KeywordId);
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