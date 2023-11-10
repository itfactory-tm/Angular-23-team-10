using TripPlanner.DAL.Models;



namespace TripPlannerAPI.Data
{
    public class DBInitializer
    {
        public static void Initialize(TripContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            // Look for any users.
            //if (context.Users.Any())
            //{
            //    return;   // DB has been seeded
            //}

            //Add users
            //context.Users.AddRange(
            //    new User { Firstname = "Jan", Surname = "Peeters", Email = "jan.peeters@gmail.com", Password = "Password", IsAdmin = true, IsActive = true },
            //    new User { Firstname = "John", Surname = "Doe", Email = "john.doe@gmail.com", Password = "Password123", IsAdmin = false, IsActive = true },
            //    new User { Firstname = "Jane", Surname = "Smith", Email = "jane.smith@gmail.com", Password = "Password456", IsAdmin = false, IsActive = false }
            //    );
            //Add trips
            context.Trips.AddRange(
                new Trip { StartDate = new DateTime(2023, 10, 16), EndDate = new DateTime(2023, 10, 31), Picture = "https://example.com/trip1.jpg", Description = "This is a test trip", IsShared = true },
                new Trip { StartDate = new DateTime(2023, 10, 15), EndDate = new DateTime(2023, 10, 17), Picture = "https://example.com/trip2.jpg", Description = "This is my first trip!", IsShared = false },
                new Trip { StartDate = new DateTime(2023, 10, 16), EndDate = new DateTime(2023, 10, 31), Picture = "https://example.com/trip3.jpg", Description = "This is my second trip!", IsShared = true }
                );

            //Add activities
            context.Activities.AddRange(
                new Activity { Name = "Restaurant" },
                new Activity { Name = "Hiking" },
                new Activity { Name = "Biking" },
                new Activity { Name = "Swimming" }
            );
            //Add keywords
            context.Keywords.AddRange(
                new Keyword { Name = "Mountains", Description = "Breathtaking landscapes with towering peaks and rugged terrain, often covered in snow." },
                new Keyword { Name = "Forests", Description = "Lush green environments filled with a variety of trees and wildlife." },
                new Keyword { Name = "Lakes", Description = "Peaceful bodies of water surrounded by scenic beauty, ideal for swimming, boating, and relaxation." },
                new Keyword { Name = "Beaches", Description = "Sandy shores and crystal-clear waters, perfect for sunbathing, swimming, and water sports." }
                );
            //Add categories
            context.Categories.AddRange(
                new Category { Name = "Outdoor adventures", Description = "Disconnect from the modern world with camping trips under the starry skies, campfires, and nature hikes." },
                new Category { Name = "Nature", Description = "Activities that take place outdoors" },
                new Category { Name = "City", Description = "Activities that take place in urban areas" },
                new Category { Name = "Culture", Description = "Activities that are related to history, art, and music" }
            );
            //Associative tables
            //Add tripactivities
            context.TripActivities.AddRange(
                new TripActivity { TripId = 1, ActivityId = 1, Price = 21.0, StartDate = new DateTime(2023, 10, 17, 19, 0, 0), EndDate = new DateTime(2023, 10, 17, 22, 0, 0) },
                new TripActivity { TripId = 3, ActivityId = 2, Price = 10.0, StartDate = new DateTime(2023, 10, 15, 15, 0, 0), EndDate = new DateTime(2023, 10, 17, 18, 0, 0) },
                new TripActivity { TripId = 1, ActivityId = 2, Price = 20.0, StartDate = new DateTime(2023, 10, 16, 6, 0, 0), EndDate = new DateTime(2023, 10, 17, 12, 0, 0) },
                new TripActivity { TripId = 2, ActivityId = 3, Price = 30.0, StartDate = new DateTime(2023, 10, 21, 14, 0, 0), EndDate = new DateTime(2023, 10, 22, 16, 0, 0) }
                );
            //Add usertrips
            context.UserTrips.AddRange(
                new UserTrip { UserId = "1", TripId = 1 },
                new UserTrip { UserId = "2", TripId = 2 },
                new UserTrip { UserId = "3", TripId = 1 },
                new UserTrip { UserId = "4", TripId = 3 }
                );
            //Add tripkeywords
            context.TripKeywords.AddRange(
                new TripKeyword { TripId = 1, KeywordId = 1 },
                new TripKeyword { TripId = 1, KeywordId = 2 },
                new TripKeyword { TripId = 2, KeywordId = 3 },
                new TripKeyword { TripId = 3, KeywordId = 2 }
                );
            //Add tripcategories
            context.TripCategories.AddRange(
                new TripCategory { TripId = 1, CategoryId = 3 },
                new TripCategory { TripId = 2, CategoryId = 1 },
                new TripCategory { TripId = 3, CategoryId = 1 },
                new TripCategory { TripId = 3, CategoryId = 2 }
                );
            context.SaveChanges();
        }
    }
}