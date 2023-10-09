using TripPlannerAPI.Models;



namespace TripPlannerAPI.Data
{
    public class DBInitializer
    {
        public static void Initialize(TripContext context)
        {
            context.Database.EnsureCreated();
            // Look for any users.
            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }



            //Add users
            context.AddRange(
                new User { UserId = 0, Firstname = "Jan", Surname = "peeters" });
            context.SaveChanges();
        }
    }
}