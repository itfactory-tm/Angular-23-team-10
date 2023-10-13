using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripPlanner.DAL.Models;
using TripPlannerAPI.Data;

namespace TripPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KeywordsController : ControllerBase
    {
        private readonly TripContext _context;

        public KeywordsController(TripContext context)
        {
            _context = context;
        }

        // GET: api/Keywords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Keyword>>> GetKeywords()
        {
            return await _context.Keywords.ToListAsync();
        }

        // GET: api/Keywords/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Keyword>> GetKeyword(int id)
        {
            var keyword = await _context.Keywords.FindAsync(id);

            if (keyword == null)
            {
                return NotFound();
            }

            return keyword;
        }

        // PUT: api/Keywords/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKeyword(int id, Keyword keyword)
        {
            if (id != keyword.KeywordId)
            {
                return BadRequest();
            }

            _context.Entry(keyword).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KeywordExists(id))
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

        // POST: api/Keywords
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Keyword>> PostKeyword(Keyword keyword)
        {
            _context.Keywords.Add(keyword);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKeyword", new { id = keyword.KeywordId }, keyword);
        }

        // DELETE: api/Keywords/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKeyword(int id)
        {
            var keyword = await _context.Keywords.FindAsync(id);
            if (keyword == null)
            {
                return NotFound();
            }

            _context.Keywords.Remove(keyword);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool KeywordExists(int id)
        {
            return _context.Keywords.Any(e => e.KeywordId == id);
        }
    }
}
