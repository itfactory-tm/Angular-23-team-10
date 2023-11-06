﻿namespace TripPlannerAPI.Dto.Trip
{
    public class TripResponse
    {
        public int TripId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Picture { get; set; }
        public string? Description { get; set; }
        public bool IsShared { get; set; }
    }
}
