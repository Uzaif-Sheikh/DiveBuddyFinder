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
    public class CertificateController : ControllerBase {

        public readonly ApplicationDbContext _DbContext;
        public readonly IMapper _mapper;

        public CertificateController(ApplicationDbContext applicationDbContext, IMapper mapper) {
            _DbContext = applicationDbContext;
            _mapper = mapper;
        }

        [HttpGet("GetCertificates")]
        public async Task<ActionResult<IEnumerable<CertificateDto>>> GetCertificates() {
            
            var certificates = await _DbContext.CertificateDetails.ToListAsync();
            return Ok(certificates.Select(d => _mapper.Map<CertificateDto>(d)));
        }

        [HttpGet("GetCertificateById/{id}")]
        public async Task<ActionResult<CertificateDto>> GetCertificateById(Guid id) {

            var certificate = await _DbContext.CertificateDetails.FindAsync(id);
            if(certificate == null) {
                return NotFound();
            }

            return Ok(_mapper.Map<CertificateDto>(certificate));
        }

        [HttpPost("Create")]
        [Authorize(Roles = "SuperUser")]
        public async Task<ActionResult<CertificateDto>> createCertificate(CreateCertificateDto createCertificate) {

            var certificate = _mapper.Map<CertificateDetails>(createCertificate);
            _DbContext.CertificateDetails.Add(certificate);
            await _DbContext.SaveChangesAsync();

            return Ok(_mapper.Map<CertificateDto>(certificate));
            
        }

        [HttpPut("Update/{id}")]
        [Authorize(Roles = "SuperUser")]
        public async Task<IActionResult> updateCertificate(Guid id, CreateCertificateDto updateCertificate) {
            
            var certificate = await _DbContext.CertificateDetails.FindAsync(id);
            if(certificate == null) return BadRequest(new {
                Error = "Diver not found"
            });

            _mapper.Map(updateCertificate, certificate);

            await _DbContext.SaveChangesAsync();
            return NoContent();

        }
        
        [HttpDelete("Delete/{id}")]
        [Authorize(Roles = "SuperUser")]
        public async Task<IActionResult> deleteCertificate(Guid id) {

            var certificate = await _DbContext.CertificateDetails.FindAsync(id);

            if(certificate == null){
                return BadRequest(new {
                    Error = "Diver not found"
                });
            }

            _DbContext.CertificateDetails.Remove(certificate);
            await _DbContext.SaveChangesAsync();

            return NoContent();

        }
    }
}