namespace TripPlannerAPI.Dto
{
    public class GetUserDto
    {
        public int UserId { get; set; }
        public string Firstname { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public Boolean IsAdmin { get; set; }
        public bool IsActive { get; set; }

    }
}
