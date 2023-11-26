using System.ComponentModel.DataAnnotations.Schema;
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
        [NotMapped]
        public IFormFile? File { get; set; }
        public string? ImgName { get; set; }
        public string? Description { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? Street { get; set; }
        public bool IsShared { get; set; }
        public ICollection<TripActivityRequest> Activities { get; set; }
    }
}
