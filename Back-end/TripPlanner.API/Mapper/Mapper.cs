﻿using AutoMapper;
using TripPlanner.DAL.Models;
using TripPlannerAPI.Dto.Activity;
using TripPlannerAPI.Dto.Category;
using TripPlannerAPI.Dto.Keyword;
using TripPlannerAPI.Dto.Trip;
using TripPlannerAPI.Dto.TripActivity;
//using TripPlannerAPI.Dto.User;
using TripPlannerAPI.Dto.UserTrip;

namespace TripPlannerAPI.Mapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<Trip, TripRequest>()
                .ForMember(dest => dest.Activities, opt => opt.MapFrom(src => src.TripActivities));
            CreateMap<TripResponse, Trip>();
            //CreateMap<User, UserRequest>();
            //CreateMap<UserCreate, User>();
            //CreateMap<UserUpdate, User>();
            CreateMap<Activity, ActivityRequest>();
            CreateMap<ActivityResponse, Activity>();
            CreateMap<KeywordResponse, Keyword>();
            CreateMap<Keyword, KeywordRequest>();
            CreateMap<Category, CategoryRequest>();
            CreateMap<CategoryResponse, Category>();
            CreateMap<TripActivityResponse, TripActivity>();
            CreateMap<TripActivity, TripActivityRequest>()
                .ForMember(dest => dest.ActivityType, opt => opt.MapFrom(src => src.Activity));
            CreateMap<UserTripResponse, UserTrip>();
            CreateMap<UserTrip, UserTripRequest>();
        }
    }
}