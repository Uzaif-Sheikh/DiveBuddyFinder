
using AutoMapper;
using DiveBuddyFinder.Data;
using DiveBuddyFinder.Models;
using DiveBuddyFinder.Models.Dtos.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiveBuddyFinder.Controllers {
    
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController : ControllerBase {

        private readonly ApplicationDbContext _DbContext;
        private readonly IMapper _Mapper;

        public LocationController(ApplicationDbContext applicationDbContext, IMapper mapper) {
            _DbContext = applicationDbContext;
            _Mapper = mapper;
        }

        [HttpGet("GetLocationByPostCode/{postcode}")]
        public async Task<ActionResult<IEnumerable<LocationDto>>> GetLocationByPostCode(int postcode) {

            var locations = await _DbContext.Locations.Where(l => l.PostCode == postcode).ToListAsync();
            
            return Ok(locations.Select(l => _Mapper.Map<LocationDto>(l)));
        }

        [HttpPost("Create")]
        [Authorize]
        public async Task<IActionResult> Create(LocationDto createLocation) {

            var location = _Mapper.Map<Location>(createLocation);

            _DbContext.Locations.Add(location);
            await _DbContext.SaveChangesAsync();

            return Ok();
        }

    }
}
