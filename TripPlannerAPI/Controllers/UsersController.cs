using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripPlanner.DAL.Models;
using TripPlannerAPI.Data;
using TripPlannerAPI.Dto.User;

namespace TripPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TripContext _context;
        private readonly IMapper _mapper;

        public UsersController(TripContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<List<UserRequest>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            if (users == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<UserRequest>>(users);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserRequest>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return _mapper.Map<UserRequest>(user);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<UserRequest>> PutUser(int id, [FromQuery] UserUpdate putUser)
        {
            if (id != putUser.UserId)
            {
                return BadRequest();
            }

            User updatedUser = _mapper.Map<User>(putUser);
            var user = _context.Users.Where(u => u.UserId == id).FirstOrDefault();

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                user.IsActive = updatedUser.IsActive;
                user.IsAdmin = updatedUser.IsAdmin;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.UserId))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserRequest>> PostUser(UserCreate user)
        {
            User newUser = _mapper.Map<User>(user);
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            UserRequest userToReturn = _mapper.Map<UserRequest>(newUser);

            return CreatedAtAction("GetUser", new { id = userToReturn.UserId }, userToReturn);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
