using TripPlannerAPI.Dto.TripActivity;

namespace TripPlannerAPI.Dto.Trip
{
    public class TripRequest
    {
        public int TripId { get; set; }
        public String Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Picture { get; set; }
        public string? Description { get; set; }
        public bool IsShared { get; set; }
        public ICollection<TripActivityRequest> Activities { get; set; }
    }
}
