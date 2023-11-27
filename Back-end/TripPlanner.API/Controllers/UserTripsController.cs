﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripPlanner.DAL.Models;
using TripPlannerAPI.Data;
using TripPlannerAPI.Dto.UserTrip;


namespace TripPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTripsController : ControllerBase
    {
        private readonly TripContext _context;
        private readonly IMapper _mapper;

        public UserTripsController(TripContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/UserTrips
        [HttpGet]
        public async Task<ActionResult<List<UserTripRequest>>> GetUserTrips()
        {
            var userTrips = await _context.UserTrips.ToListAsync();

            if (userTrips == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<UserTripRequest>>(userTrips);
        }

        // GET: api/UserTrips/5
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<UserTripRequest>>> GetTripsByUserId(String userId)
        {
            var trips = await _context.UserTrips
                .Include(ut => ut.Trip)
                .Where(ut => ut.UserId == userId)
                .Select(ut => ut.Trip)
                .ToListAsync();

            if (trips == null)
            {
                return NotFound();
            }

            return Ok(trips);
        }

        // POST: api/UserTrips
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostUserTrip(UserTripResponse userTrip)
        {
            UserTrip newUserTrip = _mapper.Map<UserTrip>(userTrip);
            _context.UserTrips.Add(newUserTrip);
            await _context.SaveChangesAsync();
            UserTripRequest userTripToReturn = _mapper.Map<UserTripRequest>(newUserTrip);

            return NoContent();
        }

        // DELETE: api/UserTrips/5
        [HttpDelete("{userId}/{tripId}")]
        public async Task<IActionResult> DeleteUserTrip(String userId, int tripId)
        {
            var userTrip = await _context.UserTrips.FindAsync(userId, tripId);
            if (userTrip == null)
            {
                return NotFound();
            }

            _context.UserTrips.Remove(userTrip);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserTripExists(string id)
        {
            return _context.UserTrips.Any(e => e.UserId == id);
        }
    }
}
