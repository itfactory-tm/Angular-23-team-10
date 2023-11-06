namespace TripPlanner.DAL.Models
{
    public class UserTrip
    {
        public int TripId { get; set; }
        public int Sub { get; set; }
        public Trip? Trip { get; }
    }
}
