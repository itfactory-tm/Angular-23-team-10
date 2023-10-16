namespace TripPlanner.DAL.Models
{
    public class TripKeyword
    {
        public int TripId { get; set; }
        public int KeywordId { get; set; }
        public Trip Trip { get; set; }
        public Keyword Keyword { get; set; }
    }
}
