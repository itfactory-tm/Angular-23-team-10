﻿namespace TripPlanner.DAL.Models
{
    public class UserTrip
    {
        public int TripId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public Trip Trip { get; set; }
    }
}
