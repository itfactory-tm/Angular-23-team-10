﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripPlanner.DAL.Models;
using TripPlannerAPI.Data;
using TripPlannerAPI.Dto.Category;

namespace TripPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly TripContext _context;
        private readonly IMapper _mapper;

        public CategoriesController(TripContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<List<CategoryRequest>>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();

            if (categories == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<CategoryRequest>>(categories);
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryRequest>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return _mapper.Map<CategoryRequest>(category);
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<CategoryRequest>> PutCategory(int id, CategoryResponse putCategory)
        {
            if (id != putCategory.CategoryId)
            {
                return BadRequest();
            }

            Category updatedCategory = _mapper.Map<Category>(putCategory);
            var category = _context.Categories.Where(u => u.CategoryId == id).FirstOrDefault();
            _context.Entry(putCategory).State = EntityState.Modified;

            try
            {
                putCategory.Name = putCategory.Name;
                putCategory.Description = putCategory.Description;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CategoryRequest>> PostCategory(CategoryResponse category)
        {
            Category newCategory = _mapper.Map<Category>(category);
            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();
            CategoryRequest categoryToReturn = _mapper.Map<CategoryRequest>(newCategory);

            return CreatedAtAction("GetCategory", new { id = categoryToReturn.CategoryId }, categoryToReturn);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}