using AutoMapper;
using TripPlanner.DAL.Models;
using TripPlannerAPI.Dto;

namespace TripPlannerAPI.Mapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<Trip, GetTripDto>();
            CreateMap<User, GetUserDto>();
            CreateMap<PostUserDto, User>();
        }
    }
}