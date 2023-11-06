using AutoMapper;
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
        [HttpGet("{id}")]
        public async Task<ActionResult<UserTripRequest>> GetUserTrip(int id)
        {
            var userTrip = await _context.UserTrips.FindAsync(id);

            if (userTrip == null)
            {
                return NotFound();
            }

            return _mapper.Map<UserTripRequest>(userTrip);
        }

        // PUT: api/UserTrips/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<UserTripRequest>> PutUserTrip(int userId, int tripId, UserTripResponse putUserTrip)
        {
            if (userId != putUserTrip.UserId || tripId != putUserTrip.TripId)
            {
                return BadRequest();
            }

            UserTrip updatedUserTrip = _mapper.Map<UserTrip>(putUserTrip);
            var userTrip = _context.UserTrips.Where(u => u.UserId == userId && u.TripId == tripId).FirstOrDefault();
            _context.Entry(putUserTrip).State = EntityState.Modified;

            try
            {
                userTrip.UserId = putUserTrip.UserId;
                userTrip.TripId = putUserTrip.TripId;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.UserTrips.Any(tc => tc.TripId == tripId && tc.UserId == userId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserTrips
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserTripRequest>> PostUserTrip(UserTripRequest userTrip)
        {
            UserTrip newUserTrip = _mapper.Map<UserTrip>(userTrip);
            _context.UserTrips.Add(newUserTrip);
            UserTripRequest userTripToReturn = _mapper.Map<UserTripRequest>(newUserTrip);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserTripExists(userTrip.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserTrip", new { userId = userTripToReturn.UserId, tripId = userTripToReturn.TripId }, userTripToReturn);
        }

        // DELETE: api/UserTrips/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserTrip(int id)
        {
            var userTrip = await _context.UserTrips.FindAsync(id);
            if (userTrip == null)
            {
                return NotFound();
            }

            _context.UserTrips.Remove(userTrip);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserTripExists(int id)
        {
            return _context.UserTrips.Any(e => e.UserId == id);
        }
    }
}
