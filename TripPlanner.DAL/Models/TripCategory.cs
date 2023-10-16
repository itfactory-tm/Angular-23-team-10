namespace TripPlanner.DAL.Models
{
    public class TripCategory
    {
        public int TripId { get; set; }
        public int CategoryId { get; set; }

        public Trip Trip { get; set; }
        public Category Category { get; set; }
    }
}
