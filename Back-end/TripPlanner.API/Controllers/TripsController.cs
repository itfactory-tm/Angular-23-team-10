using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripPlanner.DAL.Models;
using TripPlannerAPI.Data;
using TripPlannerAPI.Dto.Trip;

namespace TripPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly TripContext _context;
        private readonly IMapper _mapper;

        public TripsController(TripContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Trips
        [HttpGet]
        public async Task<ActionResult<List<TripRequest>>> GetTrips()
        {
            var trips = await _context.Trips.ToListAsync();

            if (trips == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<TripRequest>>(trips);
        }

        // GET: api/public-trips
        [HttpGet]
        [Route("public-trips")]
        public async Task<ActionResult<List<TripRequest>>> GetPublicTrips()
        {
            var trips = await _context.Trips.Where(t => t.IsShared.Equals(true)).ToListAsync();

            if (trips == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<TripRequest>>(trips);
        }

        // GET: api/Trips/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TripRequest>> GetTrip(int id)
        {
            var trip = await _context.Trips.Include(t => t.TripActivities).ThenInclude(t => t.Activity).FirstOrDefaultAsync(t => t.TripId == id);

            if (trip == null)
            {
                return NotFound();
            }

            return _mapper.Map<TripRequest>(trip);
        }

        // PUT: api/Trips/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<TripRequest>> PutTrip(int id, TripResponse putTrip)
        {
            if (id != putTrip.TripId)
            {
                return BadRequest();
            }

            Trip updatedTrip = _mapper.Map<Trip>(putTrip);
            var trip = _context.Trips.Where(u => u.TripId == id).FirstOrDefault();
            _context.Entry(trip).State = EntityState.Modified;

            try
            {
                trip.StartDate = updatedTrip.StartDate;
                trip.EndDate = updatedTrip.EndDate;
                trip.Description = updatedTrip.Description;
                trip.Picture = updatedTrip.Picture;
                trip.IsShared = updatedTrip.IsShared;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TripExists(id))
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

        // POST: api/Trips
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TripRequest>> PostTrip(TripResponse trip)
        {
            Trip newTrip = _mapper.Map<Trip>(trip);
            _context.Trips.Add(newTrip);
            await _context.SaveChangesAsync();
            TripRequest tripToReturn = _mapper.Map<TripRequest>(newTrip);

            return CreatedAtAction("GetTrip", new { id = tripToReturn.TripId }, tripToReturn);
        }

        // DELETE: api/Trips/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(int id)
        {
            var trip = await _context.Trips.FindAsync(id);
            if (trip == null)
            {
                return NotFound();
            }

            _context.Trips.Remove(trip);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TripExists(int id)
        {
            return _context.Trips.Any(e => e.TripId == id);
        }
    }
}
