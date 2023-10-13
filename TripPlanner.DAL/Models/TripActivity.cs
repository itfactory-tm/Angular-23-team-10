namespace TripPlanner.DAL.Models
{
    public class TripActivity
    {
        public int TripActivityId { get; set; }
        public int ActivityId { get; set; }
        public int TripId { get; set; }
        public double? Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public Activity Activity { get; set; }
        public Trip Trip { get; set; }
    }
}
