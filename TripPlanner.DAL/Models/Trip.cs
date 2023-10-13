namespace TripPlanner.DAL.Models
{
    public class Trip
    {
        public int TripId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Picture { get; set; }
        public string? Description { get; set; }
        public Boolean IsShared { get; set; }
        public ICollection<User> Users { get; }
        public ICollection<TripActivity> TripActivities { get; }
        public ICollection<Keyword> Keywords { get; }
        public ICollection<Category> Categories { get; }
    }
}
