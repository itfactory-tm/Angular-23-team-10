using TripPlanner.DAL.Models;



namespace TripPlannerAPI.Data
{
    public class DBInitializer
    {
        public static void Initialize(TripContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            //Add trips
            context.Trips.AddRange(
                new Trip { Name = "Berlin City Trip", StartDate = new DateTime(2023, 10, 16), EndDate = new DateTime(2023, 10, 31), Picture = "basilika.jpg", Description = "This is a test trip", IsShared = true },
                new Trip { Name = "Madrid City Trip", StartDate = new DateTime(2023, 10, 15), EndDate = new DateTime(2023, 10, 17), Picture = "disneylanbd.jpg", Description = "This is my first trip!", IsShared = false },
                new Trip { Name = "London City Trip", StartDate = new DateTime(2023, 10, 16), EndDate = new DateTime(2023, 10, 31), Picture = "heroImage.jpg", Description = "This is my second trip!", IsShared = true },
                new Trip { Name = "India Trip", StartDate = new DateTime(2023, 11, 15), EndDate = new DateTime(2023, 11, 30), Picture = "mindanou.jpg", Description = "This is my India trip!", IsShared = true }

                );

            //Add activities
            context.Activities.AddRange(
                new Activity { Name = "Sightseeing" },
                new Activity { Name = "Sport" },
                new Activity { Name = "Outdoor adventure" },
                new Activity { Name = "Cultural" }
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
                new TripActivity { TripId = 1, ActivityId = 1, Name = "Activity", Price = 21.0, StartDate = new DateTime(2023, 10, 17, 19, 0, 0), EndDate = new DateTime(2023, 10, 17, 22, 0, 0) },
                new TripActivity { TripId = 3, ActivityId = 2, Name = "Activity", Price = 10.0, StartDate = new DateTime(2023, 10, 15, 15, 0, 0), EndDate = new DateTime(2023, 10, 17, 18, 0, 0) },
                new TripActivity { TripId = 1, ActivityId = 2, Name = "Activity", Price = 20.0, StartDate = new DateTime(2023, 10, 16, 6, 0, 0), EndDate = new DateTime(2023, 10, 17, 12, 0, 0) },
                new TripActivity { TripId = 2, ActivityId = 3, Name = "Activity", Price = 30.0, StartDate = new DateTime(2023, 10, 21, 14, 0, 0), EndDate = new DateTime(2023, 10, 22, 16, 0, 0) },
                new TripActivity { TripId = 4, ActivityId = 1, Name = "Taj Mahal", Price = 30.0, StartDate = new DateTime(2023, 11, 16, 9, 0, 0), EndDate = new DateTime(2023, 11, 16, 11, 0, 0) },
                new TripActivity { TripId = 4, ActivityId = 1, Name = "Amber Palace", Price = 30.0, StartDate = new DateTime(2023, 11, 16, 14, 0, 0), EndDate = new DateTime(2023, 11, 16, 16, 0, 0) },
                new TripActivity { TripId = 4, ActivityId = 1, Name = "Red Fort", Price = 30.0, StartDate = new DateTime(2023, 11, 17, 11, 0, 0), EndDate = new DateTime(2023, 11, 17, 12, 0, 0) },
                new TripActivity { TripId = 4, ActivityId = 1, Name = "Agra Fort", Price = 30.0, StartDate = new DateTime(2023, 11, 17, 14, 0, 0), EndDate = new DateTime(2023, 11, 17, 17, 0, 0) },
                new TripActivity { TripId = 4, ActivityId = 1, Name = "Taj Mahal", Price = 30.0, StartDate = new DateTime(2023, 11, 16, 20, 0, 0), EndDate = new DateTime(2023, 11, 16, 22, 0, 0) }
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