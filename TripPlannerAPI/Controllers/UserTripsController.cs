using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripPlanner.DAL.Models;
using TripPlannerAPI.Data;

namespace TripPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTripsController : ControllerBase
    {
        private readonly TripContext _context;

        public UserTripsController(TripContext context)
        {
            _context = context;
        }

        // GET: api/UserTrips
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserTrip>>> GetUserTrips()
        {
            return await _context.UserTrips.ToListAsync();
        }

        // GET: api/UserTrips/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserTrip>> GetUserTrip(int id)
        {
            var userTrip = await _context.UserTrips.FindAsync(id);

            if (userTrip == null)
            {
                return NotFound();
            }

            return userTrip;
        }

        // PUT: api/UserTrips/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserTrip(int id, UserTrip userTrip)
        {
            if (id != userTrip.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userTrip).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserTripExists(id))
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
        public async Task<ActionResult<UserTrip>> PostUserTrip(UserTrip userTrip)
        {
            _context.UserTrips.Add(userTrip);
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

            return CreatedAtAction("GetUserTrip", new { id = userTrip.UserId }, userTrip);
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
