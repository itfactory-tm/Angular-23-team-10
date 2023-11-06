namespace TripPlannerAPI.Dto.User
{
    public class UserUpdate
    {
        public int UserId { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActive { get; set; }
    }
}
