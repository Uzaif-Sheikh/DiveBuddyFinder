using DiveBuddyFinder.Data;
using DiveBuddyFinder.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiveBuddyFinder.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class DiverController : ControllerBase {

        public readonly ApplicationDbContext _DbContext;

        public DiverController(ApplicationDbContext applicationDbContext) {
            _DbContext = applicationDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Diver>>> getDivers() {
            
            var divers = await _DbContext.divers.ToListAsync();
            return divers;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Diver>> getDiver(Guid id) {

            var diver = await _DbContext.divers.FindAsync(id);
            if(diver == null) {
                return NotFound();
            }

            return Ok(diver);
        }

        [HttpPost]
        public async Task<ActionResult<Diver>> createDiver(Diver createDiver) {

            _DbContext.divers.Add(createDiver);
            await _DbContext.SaveChangesAsync();

            return Ok(createDiver);
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> updateDiver(Guid id, Diver updateDiver) {
            
            var diver = await _DbContext.divers.FindAsync(id);
            if(diver == null) return NoContent();


            await _DbContext.SaveChangesAsync();
            return NoContent();

        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteDiver(Guid id) {

            var diver = await _DbContext.divers.FindAsync(id);

            if(diver == null){
                return NotFound();
            }

            _DbContext.divers.Remove(diver);
            await _DbContext.SaveChangesAsync();

            return NoContent();

        }
    }
}