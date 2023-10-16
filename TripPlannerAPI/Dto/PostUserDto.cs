namespace TripPlannerAPI.Dto
{
    public class PostUserDto
    {
        public int UserId { get; set; }
        public Boolean IsAdmin { get; set; }
        public bool IsActive { get; set; }
    }
}
