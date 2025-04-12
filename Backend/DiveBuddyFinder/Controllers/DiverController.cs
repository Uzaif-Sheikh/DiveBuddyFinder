using AutoMapper;
using DiveBuddyFinder.Data;
using DiveBuddyFinder.Models;
using DiveBuddyFinder.Models.Dtos.DiverDto;
using DiveBuddyFinder.Models.Dtos.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiveBuddyFinder.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class DiverController : ControllerBase {

        public readonly ApplicationDbContext _DbContext;
        public readonly IMapper _mapper;

        public DiverController(ApplicationDbContext applicationDbContext, IMapper mapper) {
            _DbContext = applicationDbContext;
            _mapper = mapper;
        }

        [HttpGet("GetDivers")]
        public async Task<ActionResult<IEnumerable<DiverDto>>> GetDivers([FromQuery] int? postcode,
                                                                        [FromQuery] string? firstname,
                                                                        [FromQuery] string? suburb,
                                                                        [FromQuery] string? state,
                                                                        [FromQuery] int offset = 0) {
            
            IQueryable<Diver> divers = _DbContext.Divers;

            if(postcode != null) {
                divers.Where(d => d.PostCode == postcode);
            }

            if(!String.IsNullOrEmpty(firstname)) {
                divers.Where(d => d.FirstName.Contains(firstname));
            }

            if(!String.IsNullOrEmpty(suburb)) {
                divers.Where(d => d.Location.Suburb.Contains(suburb));
            }

            if(!String.IsNullOrEmpty(state)) {
                divers.Where(d => d.Location.State.Contains(state));
            }

            var diversList = await divers.Skip(offset * 10)
                            .Take(10)
                            .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<DiverDto>>(diversList));
        }

        [HttpGet("GetDiverById/{id}")]
        public async Task<ActionResult<DiverDto>> GetDiverById(Guid id) {

            var diver = await _DbContext.Divers.FindAsync(id);
            if(diver == null) {
                return NotFound();
            }

            return Ok(_mapper.Map<DiverDto>(diver));
        }

        [HttpPost("Create")]
        [Authorize]
        public async Task<ActionResult<DiverDto>> createDiver(CreateDiverDto createDiver) {

            var diver = _mapper.Map<Diver>(createDiver);
            _DbContext.Divers.Add(diver);
            await _DbContext.SaveChangesAsync();

            return Ok(_mapper.Map<DiverDto>(diver));
            
        }

        [HttpPut("Update/{id}")]
        [Authorize]
        public async Task<IActionResult> updateDiver(Guid id, UpdateDiverDto updateDiver) {
            
            var diver = await _DbContext.Divers.FindAsync(id);
            if(diver == null) return BadRequest(new {
                Error = "Diver not found"
            });

            _mapper.Map(updateDiver, diver);

            await _DbContext.SaveChangesAsync();
            return NoContent();

        }
        
        [HttpDelete("Delete/{id}")]
        [Authorize]
        public async Task<IActionResult> deleteDiver(Guid id) {

            var diver = await _DbContext.Divers.FindAsync(id);

            if(diver == null){
                return BadRequest(new {
                    Error = "Diver not found"
                });
            }

            _DbContext.Divers.Remove(diver);
            await _DbContext.SaveChangesAsync();

            return NoContent();

        }
    }
}