﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripPlanner.DAL.Models;
using TripPlannerAPI.Data;
using TripPlannerAPI.Dto.Activity;

namespace TripPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ActivitiesController : ControllerBase
    {
        private readonly TripContext _context;
        private readonly IMapper _mapper;

        public ActivitiesController(TripContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Activities
        [HttpGet]
        public async Task<ActionResult<List<ActivityRequest>>> GetActivities()
        {

            var activities = await _context.Activities.ToListAsync();

            if (activities == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<ActivityRequest>>(activities);
        }

        // GET: api/Activities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityRequest>> GetActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);

            if (activity == null)
            {
                return NotFound();
            }

            return _mapper.Map<ActivityRequest>(activity);
        }

        // PUT: api/Activities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<ActivityRequest>> PutActivity(int id, ActivityResponse putActivity)
        {
            if (id != putActivity.ActivityId)
            {
                return BadRequest();
            }

            Activity updatedActivity = _mapper.Map<Activity>(putActivity);
            var activity = _context.Activities.Where(u => u.ActivityId == id).FirstOrDefault();
            _context.Entry(activity).State = EntityState.Modified;

            try
            {
                activity.Name = updatedActivity.Name;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityExists(id))
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

        // POST: api/Activities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ActivityRequest>> PostActivity(ActivityResponse activity)
        {
            Activity newActivity = _mapper.Map<Activity>(activity);
            _context.Activities.Add(newActivity);
            await _context.SaveChangesAsync();
            ActivityRequest activitytoReturn = _mapper.Map<ActivityRequest>(newActivity);

            return CreatedAtAction("GetActivity", new { id = activitytoReturn.ActivityId }, activitytoReturn);
        }

        // DELETE: api/Activities/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "DeleteAccess")]
        public async Task<IActionResult> DeleteActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
            {
                return NotFound();
            }

            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActivityExists(int id)
        {
            return _context.Activities.Any(e => e.ActivityId == id);
        }
    }
}
