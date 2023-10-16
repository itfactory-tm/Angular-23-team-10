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
    public class TripKeywordsController : ControllerBase
    {
        private readonly TripContext _context;

        public TripKeywordsController(TripContext context)
        {
            _context = context;
        }

        // GET: api/TripKeywords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripKeyword>>> GetTripKeywords()
        {
            return await _context.TripKeywords.ToListAsync();
        }

        // GET: api/TripKeywords/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TripKeyword>> GetTripKeyword(int id)
        {
            var tripKeyword = await _context.TripKeywords.FindAsync(id);

            if (tripKeyword == null)
            {
                return NotFound();
            }

            return tripKeyword;
        }

        // PUT: api/TripKeywords/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTripKeyword(int id, TripKeyword tripKeyword)
        {
            if (id != tripKeyword.TripId)
            {
                return BadRequest();
            }

            _context.Entry(tripKeyword).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TripKeywordExists(id))
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

        // POST: api/TripKeywords
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TripKeyword>> PostTripKeyword(TripKeyword tripKeyword)
        {
            _context.TripKeywords.Add(tripKeyword);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TripKeywordExists(tripKeyword.TripId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTripKeyword", new { id = tripKeyword.TripId }, tripKeyword);
        }

        // DELETE: api/TripKeywords/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTripKeyword(int id)
        {
            var tripKeyword = await _context.TripKeywords.FindAsync(id);
            if (tripKeyword == null)
            {
                return NotFound();
            }

            _context.TripKeywords.Remove(tripKeyword);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TripKeywordExists(int id)
        {
            return _context.TripKeywords.Any(e => e.TripId == id);
        }
    }
}
