using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripPlanner.DAL.Models;
using TripPlannerAPI.Data;

namespace TripPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripActivitiesController : ControllerBase
    {
        private readonly TripContext _context;

        public TripActivitiesController(TripContext context)
        {
            _context = context;
        }

        // GET: api/TripActivities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripActivity>>> GetTripActivities()
        {
            return await _context.TripActivities.ToListAsync();
        }

        // GET: api/TripActivities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TripActivity>> GetTripActivity(int id)
        {
            var tripActivity = await _context.TripActivities.FindAsync(id);

            if (tripActivity == null)
            {
                return NotFound();
            }

            return tripActivity;
        }

        // PUT: api/TripActivities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTripActivity(int id, TripActivity tripActivity)
        {
            if (id != tripActivity.TripActivityId)
            {
                return BadRequest();
            }

            _context.Entry(tripActivity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TripActivityExists(id))
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

        // POST: api/TripActivities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TripActivity>> PostTripActivity(TripActivity tripActivity)
        {
            _context.TripActivities.Add(tripActivity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTripActivity", new { id = tripActivity.TripActivityId }, tripActivity);
        }

        // DELETE: api/TripActivities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTripActivity(int id)
        {
            var tripActivity = await _context.TripActivities.FindAsync(id);
            if (tripActivity == null)
            {
                return NotFound();
            }

            _context.TripActivities.Remove(tripActivity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TripActivityExists(int id)
        {
            return _context.TripActivities.Any(e => e.TripActivityId == id);
        }
    }
}
