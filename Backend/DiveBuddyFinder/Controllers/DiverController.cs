using DiveBuddyFinder.Data;
using DiveBuddyFinder.Models;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<ActionResult<IEnumerable<Diver>>> GetDivers() {
            
            var divers = await _DbContext.Divers.ToListAsync();
            return divers;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Diver>> GetDiverById(Guid id) {

            var diver = await _DbContext.Divers.FindAsync(id);
            if(diver == null) {
                return NotFound();
            }

            return Ok(diver);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Diver>> createDiver(Diver createDiver) {

            _DbContext.Divers.Add(createDiver);
            await _DbContext.SaveChangesAsync();

            return Ok(createDiver);
            
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> updateDiver(Guid id, Diver updateDiver) {
            
            var diver = await _DbContext.Divers.FindAsync(id);
            if(diver == null) return NoContent();

            await _DbContext.SaveChangesAsync();
            return NoContent();

        }
        
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> deleteDiver(Guid id, [FromHeader] string Token) {

            var diver = await _DbContext.Divers.FindAsync(id);

            if(diver == null){
                return NotFound();
            }

            _DbContext.Divers.Remove(diver);
            await _DbContext.SaveChangesAsync();

            return NoContent();

        }
    }
}