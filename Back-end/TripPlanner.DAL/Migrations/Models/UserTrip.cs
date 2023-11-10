using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TripPlanner.DAL.Models
{
    public class UserTrip
    {
        public string UserId { get; set; } // Use the Auth0 user identifier
        public int TripId { get; set; }
        public int Sub { get; set; }
        public Trip? Trip { get; }

        // Navigation property to represent the associated user
    }
}
